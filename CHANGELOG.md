# CHANGELOG

## v2.3.0
- 05/13/2026
- UI: Added "Continue as Guest" checkout flow — cart now shows a modal with SSO login or Guest options; guest users fill all fields (including email) manually, skip "My Orders" in the dropdown, and complete the same Stripe checkout flow
- API: Added guest order endpoints (`POST /orders/guest/create-payment-intent`, `POST /orders/guest`) requiring no auth token; added `login_type` field to orders (values: "guest", "google", "github", "auth0", etc.); idempotent DB migration adds `login_type` column on startup
- Admin: Purchases table now shows a "Login Type" badge per order

## v2.2.4
- 04/26/2026
- UI: Rebuild shopping cart with real-time localStorage sync (badge updates on add/delete without page refresh); login prompt deferred to Checkout button click (browsing cart no longer requires auth); checkout form prefills user name from Auth0 profile

## v2.2.3
- 04/22/2026
- UI: fix greyed-out text in Admin Purchases order items dialog by replacing CSS variable classes with hardcoded inline color styles to bypass Radix portal theme isolation

## v2.2.2
- 04/22/2026
- API: new `order_line_items` table (auto-migrated on startup) stores item name, price, qty per order; `OrderResponse` now includes `items[]`; both `get_all_orders` and `get_orders_by_email` join line items
- UI: Order Success page lists items ordered; User Profile order cards have expandable item breakdown; Admin Purchases table has a "View" button per row that opens an item detail dialog

## v2.2.1
- 04/22/2026
- API: add 3% processing fee to PaymentIntent amount; set Stripe `description` (order details) and `statement_descriptor` ("Manna Group Intl") on every transaction; update description after order creation with order ID
- UI: checkout order summary now shows subtotal, processing fee line, and grand total; Pay button reflects the final charged amount

## v2.2.0
- 04/22/2026
- UI: add Order Success page (`/order-success`), Order Failure page (`/order-failure`), and User Profile / My Orders page (`/my-profile`); cart is cleared only on successful payment; "My Orders" link added to desktop and mobile nav dropdowns

## v2.1.0
- 04/19/2026
- Add Stripe payment integration: PaymentIntent creation, card confirmation, and order persistence across API and UI
- API: new `/orders` resource with `POST /create-payment-intent`, `POST /`, `GET /`, `GET /my-orders` endpoints; added `stripe==15.0.1` dependency via uv
- UI: implemented full checkout flow on `/shipping-address` (shipping address form + Stripe CardElement); Admin purchases page now fetches real orders from API

## v2.0.0
- 04/11/2026
- Bump version to 2.0.0 across UI, API, and Infrastructure
- Refactor UI: replace Redux Toolkit + react-redux with Zustand across all state slices and consuming components

## v0.6.1
- 04/11/2026
- Refactor UI: replace axios with native fetch API across all API service clients
- Refactor UI: centralise all env variable access through `src/util/envConfig.ts`; Theme Menu Dropdown version now driven by `VITE_APP_VERSION`

## v0.6.0
- 09/26/2025
- Migrate database from AWS RDS to Turso
- Create Manna DB cloud from Turso cloud platform

## v0.5.9
- 01/05/2025
- Add '"email"' field to Address entity - sql_alchemy_model.py ✅
- Create Checkout page ...
  - Design "MyCart" page ✅
  - Route to login if the user has not logged in ✅
  - Design "Billing page" and "Shipping page" ...
  - Design "Add Coupon" & Finalize page
  - Add Stripe page
  - Design "Success" page
  - Design "Failure" page
  - Send Email to customer & admin
- Create Checkout icon ✅
- Design Address table and map it to user profile ✅

## v0.5.8
- 12/16/2024
- Bugfix - Products page showing blank screen ✅

## v0.5.7
- 12/08/2024
- Added image ta go ProductPreview Carousel ✅
- Integrated ProductPreview with website Products - Shop page ✅
- Create Carousel for homepage ...


## v0.5.6
- 11/08/2024
- Integrated Scalar openapi docs with fastapi
- Added Image preview for assets page
- Complete Asset CRUD page

## v0.5.5
- 10/27/2024
- Integrated Scalar openapi docs with fastapi
- Added Image preview for assets page
- Complete Asset CRUD page

## v0.5.2
- 10/09/2024
- Design Admin Dashboard page


## v0.5.1
- 10/06/2024
- Fix all navigation issues
- Fix typescript generating random .js files
- Fix Mobile sidebar issue
- Fix Footer navigation issues
- Refactor `ClientRouter.tsx`

## v0.5.0
- 10/05/2024
- Deployed API to Fly.io
- Recreated DB using SQLAlchemy
- Reploy RDS instance to AWS
- Fix Auth0 login issues
