# Stripe Payment Integration

**Version:** 2.1.0  
**Date:** 2026-04-19

## Overview

Full end-to-end Stripe payment flow integrated into the Manna Group International e-commerce platform, covering the API server and the React UI.

---

## Architecture

```
User (browser)
  │
  ├─► POST /orders/create-payment-intent  ──► Stripe API (creates PaymentIntent)
  │         ← { client_secret, payment_intent_id }
  │
  ├─► stripe.confirmCardPayment(client_secret, { card })  ──► Stripe API
  │         ← { paymentIntent: { status: "succeeded" } }
  │
  └─► POST /orders/  ──► DB (order + products + address)
```

---

## API Changes

### New dependency
- `stripe==15.0.1` — added via `uv add stripe`

### New env variable (`api/.env`)
```
STRIPE_SECRET_KEY=sk_live_...   # secret key, server-side only
```

### New endpoints (`/orders`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/orders/create-payment-intent` | User | Creates Stripe PaymentIntent; returns `client_secret` |
| POST | `/orders/` | User | Verifies payment succeeded and saves order to DB |
| GET | `/orders/` | Admin | Returns all orders |
| GET | `/orders/my-orders` | User | Returns orders for the authenticated user |

### New files
- `api/models/order.py` — Pydantic models: `OrderItemModel`, `ShippingAddressModel`, `CreatePaymentIntentRequest`, `CreateOrderRequest`, `OrderResponse`
- `api/dao/order.py` — SQLAlchemy DAO: `create_order`, `get_all_orders`, `get_orders_by_email`
- `api/services/order.py` — Business logic + Stripe integration: `OrderService`
- `api/resources/order.py` — FastAPI router: `order_router`

---

## UI Changes

### New env variable (`ui/.env`)
```
VITE_ORDERS_API_URL=https://manna-grp-intl-api.fly.dev/orders
VITE_STRIPE_KEY=pk_live_...    # publishable key ONLY (not the secret key)
```

> **Important:** `VITE_STRIPE_KEY` must be the **publishable key** (`pk_live_...`) from your Stripe dashboard.  
> The secret key (`sk_live_...`) lives only in `api/.env` and is never sent to the browser.

### New / updated files
- `ui/src/common/interfaces/index.ts` — Added `IOrderItem`, `IShippingAddress`, `ICreatePaymentIntentRequest`, `ICreateOrderRequest`, `IOrderRecord`
- `ui/src/common/state/services/orders/order.api.ts` — `OrderAPIClient` (protected API client)
- `ui/src/pages/checkout/AddressShipping.page.tsx` — Full checkout page: shipping form + Stripe `CardElement` + payment confirmation
- `ui/src/pages/admin/purchases/Purchases.admin.page.tsx` — Fetches real orders from API
- `ui/src/pages/admin/purchases/purchase-data-table-columns.tsx` — Columns updated for `IOrderRecord`

---

## Checkout Flow (User Journey)

1. User adds products to cart → navigates to `/my-cart`
2. Clicks **Checkout** → redirected to `/shipping-address`
3. Fills in shipping address and optional promo code
4. Enters card details in the Stripe `CardElement`
5. Clicks **Pay $XX.XX**:
   - Frontend calls `POST /orders/create-payment-intent` → receives `client_secret`
   - Stripe.js calls `stripe.confirmCardPayment(client_secret, { card })` → Stripe processes the card
   - On success, frontend calls `POST /orders/` to persist the order
   - Cart is cleared and user is redirected to home with a success toast
6. Admin can view all orders at `/admin/purchases`

---

## Promo Code Discount

If a valid promo code is entered:
- The server looks up the promotion by name in the `promotions` table
- If valid and within date range, the percentage discount is applied to the total before creating the PaymentIntent

---

## Security Notes

- The Stripe **secret key** (`sk_live_...`) is stored only in `api/.env` and is never exposed to the browser
- The Stripe **publishable key** (`pk_live_...`) is safe to use in the frontend
- All order creation endpoints require Auth0 authentication
