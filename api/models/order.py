"""
Pydantic models for Orders and Stripe payment
"""
from pydantic import BaseModel
from typing import List, Optional


class OrderItemModel(BaseModel):
    product_id: str
    name: str
    price: float
    quantity: int


class ShippingAddressModel(BaseModel):
    street: str
    city: str
    state: str
    zip: str
    country: str
    contact: str
    email: str


class CreatePaymentIntentRequest(BaseModel):
    items: List[OrderItemModel]
    currency: str = "usd"
    promo_code: Optional[str] = None


class CreateOrderRequest(BaseModel):
    payment_intent_id: str
    name: str
    items: List[OrderItemModel]
    shipping_address: ShippingAddressModel
    promo_code: Optional[str] = None


class OrderLineItemResponse(BaseModel):
    product_id: str
    name: str
    price_cents: int
    quantity: int


class OrderResponse(BaseModel):
    order_id: str
    name: str
    email: str
    stripe_invoice: str
    total_amount: int
    order_date: str
    order_status: str
    items: List[OrderLineItemResponse] = []
