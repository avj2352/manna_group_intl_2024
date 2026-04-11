/**
 * Abstract class for authenticating using session tokens
 */
import { FetchClient } from "./public.api";

export default class ProtectedAPIClient {
  fetchClient: FetchClient;
  token: string;
  baseURL: string;

  constructor(token: string, baseURL: string) {
    this.token = token;
    this.baseURL = baseURL;
    this.fetchClient = new FetchClient(baseURL, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
  }
}
