/**
 * Shared state management types.
 * All slice stores live in their respective feature folders as Zustand stores.
 */

export type API_STATUS = "initial" | "pending" | "success" | "error";

export type IBaseState = {
  status: API_STATUS;
  api_response: string;
};

export type ISearch = {
  text: string;
};
