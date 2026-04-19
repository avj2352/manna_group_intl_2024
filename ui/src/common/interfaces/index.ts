/**
 * ********** API RELATED ***************
 */

///////////// FILES //////////////////
export type IFileResponseRecord = {
  name: string;
  filesize: number;
};

///////////// ASSETS //////////////////
export type IAssetRequestPayload = {
  asset_type: "gallery" | "product" | "other";
  position?: number;
  description: string;
  asset_key: string;
};

export type IAssetRecord = {
  asset_id: string;
  position: number;
  asset_key: string;
  asset_type: "gallery" | "product" | "other";
  description: string;
  url: string;
};

export type IAssetRequestForm = Pick<
  IAssetRecord,
  "asset_key" | "description" | "asset_type"
> & { position?: number };

///////////// PRODUCTS //////////////////

export type IProductRecord = {
  product_id: string;
  name: string;
  description: string;
  content: string;
  assets: string[];
  price: number;
  currency: number;
  quantity: number;
};

export type IProductRequestPayload = Pick<
  IProductRecord,
  | "name"
  | "description"
  | "content"
  | "assets"
  | "currency"
  | "price"
  | "quantity"
>;
export type IProductRequestForm = IProductRequestPayload;

export type ICartInventory = {
  item: IProductRecord;
  count: number;
};

///////////// ORDERS & CHECKOUT //////////////////

export type IOrderItem = {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
};

export type IShippingAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  contact: string;
  email: string;
};

export type ICreatePaymentIntentRequest = {
  items: IOrderItem[];
  currency: string;
  promo_code?: string;
};

export type ICreateOrderRequest = {
  payment_intent_id: string;
  name: string;
  items: IOrderItem[];
  shipping_address: IShippingAddress;
  promo_code?: string;
};

export type IOrderRecord = {
  order_id: string;
  name: string;
  email: string;
  stripe_invoice: string;
  total_amount: number;
  order_date: string;
  order_status: string;
};

///////////// PROMOTIONS //////////////////

export type IPromotionRecord = {
  promotion_id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  percentage: number;
};

export type IPromotionRequestPayload = Pick<
  IPromotionRecord,
  "name" | "description" | "start_date" | "end_date" | "percentage"
>;
export type IPromotionRequestForm = IPromotionRequestPayload;

/**
 * ********** UI RELATED ***************
 */

/**
 * Nav List
 * to be used by
 * - Navbar
 * - AdminNavbar
 * - AuthNavbar
 */
export type INavItem = {
  label: string;
  link: string;
  scrollId: string;
  category:
    | "about"
    | "products"
    | "company"
    | "contact"
    | "assets"
    | "promotions"
    | "purchases"
    | "mobile";
};

export type IMobileNavItem = INavItem & {
  icon?: JSX.Element | undefined;
};

export type ErrorFieldMsg = {
  field: string;
  message: string;
};

export type ErrorResponse = {
  detail: string;
  errors?: ErrorFieldMsg[];
};
