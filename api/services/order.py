"""
Service layer for Orders - integrates Stripe payment processing
"""
import logging
import stripe
from typing import List
from fastapi import HTTPException
# custom
from models.order import CreatePaymentIntentRequest, CreateOrderRequest, OrderResponse
from dao.order import create_order, get_all_orders, get_orders_by_email
from dao.promotion import get_promotion_by_name
from util.env_config import STRIPE_SECRET_KEY

stripe.api_key = STRIPE_SECRET_KEY


class OrderService:

    def _calculate_total_cents(self, items, promo_code: str | None = None) -> int:
        """Calculate order total in cents, applying promo discount if valid."""
        total_cents = sum(int(item.price * 100) * item.quantity for item in items)
        if promo_code:
            try:
                promo = get_promotion_by_name(promo_name=promo_code.lower())
                if promo and promo.percentage:
                    discount = int(total_cents * promo.percentage / 100)
                    total_cents = max(0, total_cents - discount)
                    logging.debug(f"Applied promo '{promo_code}': -{promo.percentage}% → {total_cents} cents")
            except Exception as err:
                logging.warning(f"Could not apply promo code '{promo_code}': {err}")
        return total_cents

    def create_payment_intent(self, payload: CreatePaymentIntentRequest) -> dict:
        """
        Create a Stripe PaymentIntent and return the client_secret
        for the frontend to confirm the card payment.
        """
        logging.debug("Service: creating Stripe PaymentIntent")
        try:
            total_cents = self._calculate_total_cents(payload.items, payload.promo_code)
            if total_cents <= 0:
                raise HTTPException(status_code=400, detail="Order total must be greater than zero")

            currency = (payload.currency or "usd").lower()
            intent = stripe.PaymentIntent.create(
                amount=total_cents,
                currency=currency,
                payment_method_types=["card"],
            )
            logging.debug(f"Service: PaymentIntent created: {intent.id}")
            return {
                "client_secret": intent.client_secret,
                "payment_intent_id": intent.id,
                "amount": total_cents,
                "currency": currency,
            }
        except stripe.StripeError as err:
            logging.error(f"Service: Stripe error creating PaymentIntent: {err}")
            raise HTTPException(status_code=400, detail=str(err.user_message))
        except HTTPException:
            raise
        except Exception as err:
            logging.error(f"Service: Error creating PaymentIntent: {err.__class__} - {err}")
            raise HTTPException(status_code=500, detail="Error creating payment intent")

    def create_order(self, payload: CreateOrderRequest, email: str) -> OrderResponse:
        """
        Verify the Stripe PaymentIntent is succeeded, then persist the order.
        """
        logging.debug(f"Service: creating order for {email}, intent: {payload.payment_intent_id}")
        try:
            intent = stripe.PaymentIntent.retrieve(payload.payment_intent_id)
            if intent.status != "succeeded":
                raise HTTPException(
                    status_code=400,
                    detail=f"Payment not completed. Current status: {intent.status}",
                )

            total_cents = self._calculate_total_cents(payload.items, payload.promo_code)
            result = create_order(
                order=payload,
                email=email,
                total_amount=total_cents,
                payment_intent_id=payload.payment_intent_id,
            )
            return result
        except stripe.StripeError as err:
            logging.error(f"Service: Stripe error verifying PaymentIntent: {err}")
            raise HTTPException(status_code=400, detail=str(err.user_message))
        except HTTPException:
            raise
        except Exception as err:
            logging.error(f"Service: Error creating order: {err.__class__} - {err}")
            raise HTTPException(status_code=500, detail="Error creating order")

    def get_all_orders(self) -> List[OrderResponse]:
        """Retrieve all orders (admin only)."""
        logging.debug("Service: retrieving all orders")
        try:
            return get_all_orders()
        except Exception as err:
            logging.error(f"Service: Error retrieving orders: {err.__class__} - {err}")
            raise HTTPException(status_code=500, detail="Error retrieving orders")

    def get_my_orders(self, email: str) -> List[OrderResponse]:
        """Retrieve orders for the authenticated customer."""
        logging.debug(f"Service: retrieving orders for {email}")
        try:
            return get_orders_by_email(email=email)
        except Exception as err:
            logging.error(f"Service: Error retrieving user orders: {err.__class__} - {err}")
            raise HTTPException(status_code=500, detail="Error retrieving user orders")
