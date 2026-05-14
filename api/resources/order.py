"""
Order API routes - Stripe payment intent + order creation
"""
import logging
from fastapi import APIRouter, Depends, HTTPException, Security, status
from fastapi_auth0 import Auth0User
# custom
from models.order import CreatePaymentIntentRequest, CreateOrderRequest
from util.helper import config_logging
from services.auth import AuthService, auth_lib
from services.order import OrderService

config_logging(logging.DEBUG)

auth_service = AuthService()
order_service = OrderService()
order_router = APIRouter()


@order_router.post("/create-payment-intent", dependencies=[Depends(auth_lib.implicit_scheme)])
def create_payment_intent(
    payload: CreatePaymentIntentRequest,
    user: Auth0User = Security(auth_lib.get_user),
):
    """
    Create a Stripe PaymentIntent for the cart items.
    Returns client_secret for frontend card confirmation.
    Requires authentication.
    """
    logging.debug(f"Route: create-payment-intent for user {user}")
    return order_service.create_payment_intent(payload)


@order_router.post("/", dependencies=[Depends(auth_lib.implicit_scheme)])
def create_order(
    payload: CreateOrderRequest,
    user: Auth0User = Security(auth_lib.get_user),
):
    """
    Create an order after the Stripe payment is confirmed.
    Verifies the PaymentIntent status before persisting.
    Requires authentication.
    """
    user_details = f"{user}"
    user_info = auth_service.find_user_by_email_vendor(user_details)
    email = user_info.get("email", "")
    return {"message": order_service.create_order(payload=payload, email=email, login_type=payload.login_type)}


@order_router.post("/guest/create-payment-intent")
def guest_create_payment_intent(payload: CreatePaymentIntentRequest):
    """
    Create a Stripe PaymentIntent for guest (unauthenticated) checkout.
    """
    logging.debug("Route: guest create-payment-intent")
    return order_service.create_payment_intent(payload)


@order_router.post("/guest")
def guest_create_order(payload: CreateOrderRequest):
    """
    Create an order for a guest checkout (no Auth0 token required).
    Email is taken from the shipping address since there is no authenticated user.
    """
    logging.debug("Route: guest create_order")
    email = payload.shipping_address.email
    return {"message": order_service.create_order(payload=payload, email=email, login_type="guest")}


@order_router.get("/", dependencies=[Depends(auth_lib.implicit_scheme)])
def get_all_orders(user: Auth0User = Security(auth_lib.get_user)):
    """
    Get all orders. Admin only.
    """
    user_details = f"{user}"
    if not auth_service.check_user_is_admin(user_details):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not an Admin")
    return {"message": order_service.get_all_orders()}


@order_router.get("/my-orders", dependencies=[Depends(auth_lib.implicit_scheme)])
def get_my_orders(user: Auth0User = Security(auth_lib.get_user)):
    """
    Get orders placed by the authenticated customer.
    """
    user_details = f"{user}"
    user_info = auth_service.find_user_by_email_vendor(user_details)
    email = user_info.get("email", "")
    return {"message": order_service.get_my_orders(email=email)}
