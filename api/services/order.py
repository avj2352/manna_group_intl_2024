"""
Service layer for Orders - integrates Stripe payment processing
"""
import logging
import stripe
from typing import List, Tuple
from fastapi import HTTPException
# custom
from models.order import CreatePaymentIntentRequest, CreateOrderRequest, OrderResponse
from dao.order import create_order, get_all_orders, get_orders_by_email
from dao.promotion import get_promotion_by_name
from util.env_config import STRIPE_SECRET_KEY

stripe.api_key = STRIPE_SECRET_KEY

PROCESSING_FEE_RATE = 0.03
STATEMENT_DESCRIPTOR = "Manna Group Intl"


class OrderService:

    def _calculate_total_cents(
        self, items, promo_code: str | None = None
    ) -> Tuple[int, int, int]:
        """
        Returns (subtotal_cents, fee_cents, total_cents).
        Applies promo discount first, then adds 3% processing fee.
        """
        subtotal_cents = sum(int(item.price * 100) * item.quantity for item in items)
        if promo_code:
            try:
                promo = get_promotion_by_name(promo_name=promo_code.lower())
                if promo and promo.percentage:
                    discount = int(subtotal_cents * promo.percentage / 100)
                    subtotal_cents = max(0, subtotal_cents - discount)
                    logging.debug(f"Applied promo '{promo_code}': -{promo.percentage}% → {subtotal_cents} cents")
            except Exception as err:
                logging.warning(f"Could not apply promo code '{promo_code}': {err}")
        fee_cents = round(subtotal_cents * PROCESSING_FEE_RATE)
        total_cents = subtotal_cents + fee_cents
        return subtotal_cents, fee_cents, total_cents

    def _build_description(self, items, name: str | None = None, order_id: str | None = None) -> str:
        item_summary = ", ".join(f"{item.name} x{item.quantity}" for item in items)
        parts = ["Manna Group International e-commerce order"]
        if order_id:
            parts.append(f"Order #{order_id}")
        if name:
            parts.append(f"Customer: {name}")
        parts.append(f"Items: {item_summary}")
        return " | ".join(parts)

    def create_payment_intent(self, payload: CreatePaymentIntentRequest) -> dict:
        """
        Create a Stripe PaymentIntent and return the client_secret
        for the frontend to confirm the card payment.
        """
        logging.debug("Service: creating Stripe PaymentIntent")
        try:
            subtotal_cents, fee_cents, total_cents = self._calculate_total_cents(
                payload.items, payload.promo_code
            )
            if total_cents <= 0:
                raise HTTPException(status_code=400, detail="Order total must be greater than zero")

            currency = (payload.currency or "usd").lower()
            description = self._build_description(payload.items)
            intent = stripe.PaymentIntent.create(
                amount=total_cents,
                currency=currency,
                payment_method_types=["card"],
                description=description,
                statement_descriptor=STATEMENT_DESCRIPTOR,
            )
            logging.debug(f"Service: PaymentIntent created: {intent.id}")
            return {
                "client_secret": intent.client_secret,
                "payment_intent_id": intent.id,
                "amount": total_cents,
                "subtotal": subtotal_cents,
                "processing_fee": fee_cents,
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
        Updates the PaymentIntent description with full order details.
        """
        logging.debug(f"Service: creating order for {email}, intent: {payload.payment_intent_id}")
        try:
            intent = stripe.PaymentIntent.retrieve(payload.payment_intent_id)
            if intent.status != "succeeded":
                raise HTTPException(
                    status_code=400,
                    detail=f"Payment not completed. Current status: {intent.status}",
                )

            _, _, total_cents = self._calculate_total_cents(payload.items, payload.promo_code)
            result = create_order(
                order=payload,
                email=email,
                total_amount=total_cents,
                payment_intent_id=payload.payment_intent_id,
            )

            # Update PaymentIntent with full order details for Stripe dashboard visibility
            try:
                full_description = self._build_description(
                    payload.items, name=payload.name, order_id=result.order_id
                )
                stripe.PaymentIntent.modify(
                    payload.payment_intent_id,
                    description=full_description,
                )
                logging.debug(f"Service: Updated PaymentIntent description for order {result.order_id}")
            except Exception as err:
                logging.warning(f"Service: Could not update PaymentIntent description: {err}")

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
