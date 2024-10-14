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
  category: "about" | "products" | "company" | "contact" | "assets" | "promotions" | "purchases";
};

export type ErrorFieldMsg = {
  field: string;
  message: string;
};

export type ErrorResponse = {
  detail: string;
  errors?: ErrorFieldMsg[];
};

export const API_ERROR_MSG: string = `An unknown error has occured. \n
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
