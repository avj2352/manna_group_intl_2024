/**
 * ********** API RELATED ***************
 */

///////////// FILES //////////////////
export type IFileResponseRecord = {
  "name": string,
  "filesize": number
};

///////////// ASSETS //////////////////
export type IAssetRequestPayload = {
  asset_type: 'gallery' | 'product' | 'other',
  position?: number,
  description: string,
  asset_key: string
};

export type IAssetRecord = {
  asset_id: string;
  position: number;
  asset_key: string;
  asset_type: 'gallery' | 'product' | 'other';
  description: string;
  url: string;
}

export type IAssetRequestForm = Pick<IAssetRecord, 'asset_key' | 'description' | 'asset_type'> & { position ? : number };

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
}

export type IProductRequestPayload = Pick<IProductRecord, 'name' | 'description' | 'content' | 'assets' | 'currency' | 'price' | 'quantity'>;
export type IProductRequestForm = IProductRequestPayload;

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
  category: "about" | "products" | "company" | "contact" | "assets" | "promotions" | "purchases" | "mobile";
};

export type IMobileNavItem = INavItem & {
  icon?: JSX.Element | undefined
};

export type ErrorFieldMsg = {
  field: string;
  message: string;
};

export type ErrorResponse = {
  detail: string;
  errors?: ErrorFieldMsg[];
};

// export const API_ERROR_MSG: string = `An unknown error has occured. \n
    unable to fetch appropriate error response`;

/**
 * Function to serialize Fastapi 400 error response object
 * @param {ErrorResponse} response
 * @returns {string} serialized message
 */
export function formatErrorMsg(response: ErrorResponse): string {
  let result: string = "";
  const { detail, errors } = response;
  result += `\n${detail}\n`;
  if (Boolean(errors)) {
    result += `\n${errors?.map((item: ErrorFieldMsg) => {
      return "\n" + item.field + ": " + item.message + " ";
    })}`;
  }
  return result;
}
