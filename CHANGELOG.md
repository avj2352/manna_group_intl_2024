# CHANGELOG

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
