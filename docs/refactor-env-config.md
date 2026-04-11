# Refactor: Centralise Env Variable Access via `envConfig.ts`

**Date:** 2026-04-11
**Version:** 0.5.9

## Summary

Consolidated all `import.meta.env.*` references behind a single module: `src/util/envConfig.ts`. No module outside this file should ever reference `import.meta.env` directly.

## Motivation

- Single place to audit and manage all env variables
- Consistent fallback defaults defined once
- Easier to swap env access strategy (e.g. runtime config) in the future

## Changes

### `src/util/envConfig.ts`

- Added `export` to every constant so they can be imported by other modules
- Added `VITE_API_URL` (was used in `store.ts` but missing from envConfig)
- Added a module-level comment documenting the convention

### `src/components/ThemeToggler.tsx`

- Removed `import { APP_VERSION } from '@/common/state/store'`
- Removed local `const API_URL = import.meta.env.VITE_SWAGGER_DOCS`
- Now imports `VITE_APP_VERSION` and `VITE_SWAGGER_DOCS` from `@/util/envConfig`
- The version displayed in the Theme Menu Dropdown now reflects the `VITE_APP_VERSION` env variable

### `src/common/state/store.ts`

- Removed hardcoded `export const APP_VERSION = '0.5.9'`
- Removed `export const API_URL = import.meta.env.VITE_API_URL`

### `src/main.tsx`

- Replaced three direct `import.meta.env.*` calls with imports from `@/util/envConfig`

### `src/App.tsx`

- Replaced `import.meta.env.VITE_AUTH0_AUDIENCE` with `VIT_AUTH0_AUDIENCE` from `@/util/envConfig`

### Redux slice files

Each slice previously read its API base URL via `import.meta.env` directly. All five now import from `@/util/envConfig`:

| Slice | Env variable |
|---|---|
| `auth.slice.ts` | `VITE_AUTH_API_URL` |
| `asset.slice.ts` | `VITE_ASSETS_API_URL` |
| `file.slice.ts` | `VITE_FILES_API_URL` |
| `product.slice.ts` | `VITE_PRODUCTS_API_URL` |
| `promo.slice.ts` | `VITE_PROMOTIONS_API_URL` |

## Convention

> All env variable access must go through `@/util/envConfig`. Never use `import.meta.env` outside that file.
