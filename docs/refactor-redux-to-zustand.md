# Refactor: Redux Toolkit → Zustand

**Date:** 2026-04-11  
**Version:** 2.0.0

## Overview

Replaced all Redux Toolkit (`@reduxjs/toolkit`) and `react-redux` state management with [Zustand](https://zustand.docs.pmnd.rs/) across the entire UI application.

## Motivation

- Zustand requires no `Provider` wrapper — stores are module-level singletons
- Simpler async action pattern (direct `set()` calls instead of `createAsyncThunk` + `extraReducers`)
- Smaller bundle size and less boilerplate
- Consistent with the project's stated preference for Zustand

## Changes

### Slice files rewritten (`src/common/state/features/`)

All 6 slice files were rewritten from `createSlice`/`createAsyncThunk` to `create<Store>()` (Zustand):

| File | Store hook exported |
|------|---------------------|
| `auth/auth.slice.ts` | `useAuthStore` |
| `assets/asset.slice.ts` | `useAssetStore` |
| `assets/file.slice.ts` | `useFileStore` |
| `products/product.slice.ts` | `useProductStore` |
| `promotions/promo.slice.ts` | `usePromoStore` |
| `checkout/checkout.slice.ts` | `useCheckoutStore` |

State field names and async method names are preserved exactly as before.

### `src/common/state/store.ts`

Removed all Redux setup (`configureStore`, combined reducer, `useAppDispatch`, `useAppSelector`). Now exports only shared types:

```typescript
export type API_STATUS = "initial" | "pending" | "success" | "error";
export type IBaseState = { status: API_STATUS; api_response: string; };
export type ISearch = { text: string; };
```

### `src/main.tsx`

Removed `<Provider store={store}>` wrapper — no longer needed with Zustand.

### Components and pages updated

All components that previously called `useAppDispatch()` / `useAppSelector()` were updated to call the relevant Zustand store hooks directly:

- `App.tsx`
- `layouts/CommonLayout.tsx`, `layouts/AdminLayout.tsx`
- `components/navigation/Navbar.tsx`
- `components/navigation/desktop/UserProfileDropdown.tsx`
- `components/navigation/mobile/MobileUserProfileDropdown.tsx`
- `components/badges/ShoppingCartBadge.tsx`
- `components/forms/products/AddEditProduct.form.tsx`
- `components/forms/assets/AddEditAsset.form.tsx`
- `components/tables/assets/manage-assets-table-column.tsx`
- `components/tables/products/manage-products-table-column.tsx`
- `components/tables/promos/manage-promo-table-column.tsx`
- `pages/products/Products.page.tsx`
- `pages/checkout/ShoppingCart.page.tsx`
- `pages/admin/AdminDashboard.page.tsx`
- `pages/admin/products/Products.admin.page.tsx`
- `pages/admin/products/AddProduct.admin.page.tsx`
- `pages/admin/products/sections/Products.table.section.tsx`
- `pages/admin/products/sections/Product.preview.section.tsx`
- `pages/admin/promos/Promos.admin.page.tsx`
- `pages/admin/promos/sections/Promos.table.section.tsx`
- `pages/admin/assets/Assets.admin.page.tsx`
- `pages/admin/assets/AddAsset.admin.page.tsx`
- `pages/admin/assets/EditAsset.admin.page.tsx`
- `pages/admin/assets/sections/Assets.table.section.tsx`
- `pages/admin/assets/sections/Files.table.section.tsx`

## Migration Pattern

**Before (Redux):**
```typescript
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { fetchProductListAPI, resetDelete } from "@/common/state/features/products/product.slice";

const dispatch = useAppDispatch();
const { product_list, product_delete_status } = useAppSelector(state => state.products);

dispatch(fetchProductListAPI());
dispatch(resetDelete({}));
```

**After (Zustand):**
```typescript
import { useProductStore } from "@/common/state/features/products/product.slice";

const { product_list, product_delete_status, fetchProductListAPI, resetDelete } = useProductStore();

fetchProductListAPI();
resetDelete();
```

## Packages Removed

- `@reduxjs/toolkit`
- `react-redux`
