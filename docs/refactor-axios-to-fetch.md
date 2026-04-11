# Refactor: Replace Axios with Native Fetch API

**Date:** 2026-04-11
**Version:** 0.5.9

## Summary

Removed the `axios` npm dependency from the UI and replaced all HTTP calls with the browser's native `fetch` API.

## Motivation

- Eliminate a third-party dependency in favour of a built-in browser API
- Reduce bundle size
- Align with the project's preference for minimal external dependencies

## Changes

### New `FetchClient` class (`src/common/state/services/abstract/public.api.ts`)

A lightweight `FetchClient` class was introduced alongside `PublicAPIClient`. It wraps native `fetch` and exposes the same interface that consumers previously expected from an axios instance:

| Method | Signature |
|---|---|
| `get` | `get<T>(path: string): Promise<{ data: T }>` |
| `post` | `post<T>(path: string, payload?: unknown): Promise<{ data: T }>` |
| `put` | `put<T>(path: string, payload?: unknown): Promise<{ data: T }>` |
| `delete` | `delete<T>(path: string): Promise<{ data: T }>` |

The `{ data: T }` return shape is preserved so no changes were required in the Redux slice consumers.

**`FormData` handling:** when the payload is a `FormData` instance, `Content-Type` is intentionally omitted so the browser can set the correct `multipart/form-data; boundary=...` header automatically.

**Error handling:** a non-2xx HTTP status throws an `Error`, matching axios's default behaviour.

### `ProtectedAPIClient` (`src/common/state/services/abstract/protected.api.ts`)

Replaced `AxiosInstance` with `FetchClient`, passing the `Authorization: Bearer <token>` and `Content-Type: application/json` headers as constructor-level defaults.

### `PublicAPIClient` (`src/common/state/services/abstract/public.api.ts`)

Replaced `AxiosInstance` with `FetchClient`, passing `Content-Type: application/json` as a default header.

### API client subclasses updated

All subclasses renamed `this.axiosInstance` → `this.fetchClient`:

- `src/common/state/services/auth/auth.api.ts`
- `src/common/state/services/assets/asset.api.ts`
- `src/common/state/services/assets/asset.public.api.ts`
- `src/common/state/services/assets/files.api.ts`
- `src/common/state/services/products/product.admin.api.ts`
- `src/common/state/services/products/product.public.api.ts`
- `src/common/state/services/promos/promo.admin.api.ts`
- `src/common/state/services/promos/promo.public.api.ts`

### Test files updated

All four test files were rewritten to use `vi.stubGlobal('fetch', ...)` instead of mocking `axios.create`:

- `src/common/state/services/abstract/public.api.test.ts`
- `src/common/state/services/abstract/protected.api.test.ts`
- `src/common/state/services/auth/auth.api.test.ts`
- `src/common/state/services/assets/asset.api.test.ts`

### `package.json`

- Removed: `"axios": "^1.6.8"`
- Added: `"@testing-library/jest-dom"` (dev) — was referenced in `setupTests.ts` but missing
