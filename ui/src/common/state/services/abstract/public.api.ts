/**
 * Abstract class for public exposed api endpoints
 */

export class FetchClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  private async request<T>(method: string, path: string, payload?: unknown): Promise<{ data: T }> {
    const headers: Record<string, string> = { ...this.defaultHeaders };
    let body: BodyInit | undefined;

    if (payload !== undefined) {
      if (payload instanceof FormData) {
        // Let the browser set Content-Type with the correct boundary for FormData
        delete headers["Content-Type"];
        body = payload;
      } else {
        body = JSON.stringify(payload);
      }
    }

    const response = await fetch(`${this.baseURL}${path}`, { method, headers, body });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = (await response.json()) as T;
    return { data };
  }

  get<T>(path: string): Promise<{ data: T }> {
    return this.request<T>("GET", path);
  }

  post<T>(path: string, payload?: unknown): Promise<{ data: T }> {
    return this.request<T>("POST", path, payload);
  }

  put<T>(path: string, payload?: unknown): Promise<{ data: T }> {
    return this.request<T>("PUT", path, payload);
  }

  delete<T>(path: string): Promise<{ data: T }> {
    return this.request<T>("DELETE", path);
  }
}

export default class PublicAPIClient {
  fetchClient: FetchClient;
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.fetchClient = new FetchClient(baseURL, {
      "Content-Type": "application/json",
    });
  }
}
