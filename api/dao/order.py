"""
DAO layer for orders table related queries
"""
import logging
import uuid
from typing import List
from sqlalchemy.orm import Session, sessionmaker
# custom
from dao.sql_alchemy_models import Order, OrderProduct, OrderAddress, OrderLineItem, get_connection
from models.order import CreateOrderRequest, OrderResponse, OrderLineItemResponse
from exceptions.custom_exceptions import OrderDAOException
from util.helper import get_current_timestamp

engine = get_connection()


def _fetch_line_items(session: Session, order_id: str) -> List[OrderLineItemResponse]:
    rows = session.query(OrderLineItem).filter(OrderLineItem.order_id == order_id).all()
    return [
        OrderLineItemResponse(
            product_id=r.product_id,
            name=r.name,
            price_cents=r.price_cents,
            quantity=r.quantity,
        )
        for r in rows
    ]


def create_order(order: CreateOrderRequest, email: str, total_amount: int, payment_intent_id: str) -> OrderResponse:
    """
    Persist a new order with its line items, products mapping, and shipping address.
    Returns an OrderResponse on success.
    """
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()
    try:
        order_id = str(uuid.uuid4())
        order_date = get_current_timestamp()

        order_record = Order(
            order_id=order_id,
            name=order.name,
            email=email,
            stripe_invoice=payment_intent_id,
            total_amount=total_amount,
            order_date=order_date,
            order_type="online",
            order_status="confirmed",
        )
        session.add(order_record)
        session.flush()

        line_items: List[OrderLineItemResponse] = []
        for item in order.items:
            price_cents = round(item.price * 100)
            session.add(OrderLineItem(
                order_id=order_id,
                product_id=item.product_id,
                name=item.name,
                price_cents=price_cents,
                quantity=item.quantity,
            ))
            # Legacy mapping kept for backwards compatibility
            for _ in range(item.quantity):
                session.add(OrderProduct(order_id=order_id, product_id=item.product_id))
            line_items.append(OrderLineItemResponse(
                product_id=item.product_id,
                name=item.name,
                price_cents=price_cents,
                quantity=item.quantity,
            ))

        addr = order.shipping_address
        session.add(OrderAddress(
            order_id=order_id,
            type="shipping",
            street=addr.street,
            city=addr.city,
            state=addr.state,
            zip=addr.zip,
            country=addr.country,
            contact=addr.contact,
            email=addr.email,
        ))

        session.commit()
        logging.info(f"DAO: Order {order_id} created successfully")

        return OrderResponse(
            order_id=order_id,
            name=order.name,
            email=email,
            stripe_invoice=payment_intent_id,
            total_amount=total_amount,
            order_date=order_date,
            order_status="confirmed",
            items=line_items,
        )
    except Exception as err:
        session.rollback()
        logging.error(f"DAO: Error creating order - {err.__class__} - {err}")
        raise OrderDAOException("OrderDAO Error! failed to create order")
    finally:
        session.close()


def get_all_orders() -> List[OrderResponse]:
    """Fetch all orders with their line items (admin use)."""
    try:
        with Session(engine) as session:
            orders = session.query(Order).all()
            return [
                OrderResponse(
                    order_id=o.order_id,
                    name=o.name or "",
                    email=o.email or "",
                    stripe_invoice=o.stripe_invoice or "",
                    total_amount=o.total_amount or 0,
                    order_date=o.order_date or "",
                    order_status=o.order_status or "",
                    items=_fetch_line_items(session, o.order_id),
                )
                for o in orders
            ]
    except Exception as err:
        logging.error(f"DAO: Error retrieving orders - {err.__class__} - {err}")
        raise OrderDAOException("OrderDAO Error! failed to retrieve orders")


def get_orders_by_email(email: str) -> List[OrderResponse]:
    """Fetch orders (with line items) for a specific customer email."""
    try:
        with Session(engine) as session:
            orders = session.query(Order).filter(Order.email == email).all()
            return [
                OrderResponse(
                    order_id=o.order_id,
                    name=o.name or "",
                    email=o.email or "",
                    stripe_invoice=o.stripe_invoice or "",
                    total_amount=o.total_amount or 0,
                    order_date=o.order_date or "",
                    order_status=o.order_status or "",
                    items=_fetch_line_items(session, o.order_id),
                )
                for o in orders
            ]
    except Exception as err:
        logging.error(f"DAO: Error retrieving orders by email - {err.__class__} - {err}")
        raise OrderDAOException("OrderDAO Error! failed to retrieve orders by email")
