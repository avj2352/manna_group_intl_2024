/**
 * Centralised access to env variables.
 * All modules must import from here — never reference import.meta.env directly.
 */

// app
export const VITE_APP_VERSION = import.meta.env.VITE_APP_VERSION || "2.3.0";

// oauth2.0
export const VITE_AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN || "";
export const VITE_AUTH0_CLIENT = import.meta.env.VITE_AUTH0_CLIENT || "";
export const VIT_AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE || "";

// stripe
export const VITE_STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY || "";

// api
export const VITE_API_URL = import.meta.env.VITE_API_URL || "";
export const VITE_SWAGGER_DOCS =
  import.meta.env.VITE_SWAGGER_DOCS || "http://localhost:8000/docs";
export const VITE_AUTH_API_URL =
  import.meta.env.VITE_AUTH_API_URL || "http://localhost:8000/auth";
export const VITE_ASSETS_API_URL =
  import.meta.env.VITE_ASSETS_API_URL || "http://localhost:8000/assets";
export const VITE_PRODUCTS_API_URL =
  import.meta.env.VITE_PRODUCTS_API_URL || "http://localhost:8000/products";
export const VITE_PROMOTIONS_API_URL =
  import.meta.env.VITE_PROMOTIONS_API_URL || "http://localhost:8000/promotions";
export const VITE_FILES_API_URL =
  import.meta.env.VITE_FILES_API_URL || "http://localhost:8000/files";
export const VITE_ORDERS_API_URL =
  import.meta.env.VITE_ORDERS_API_URL || "http://localhost:8000/orders";
