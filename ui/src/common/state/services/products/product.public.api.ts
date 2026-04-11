/**
 * Pre-configure ProductPublicAPIClient client to extend PublicAPIClient
 */
import PublicAPIClient from "@/common/state/services/abstract/public.api";

export default class ProductPublicAPIClient extends PublicAPIClient {
  constructor(baseURL?: string) {
    super(baseURL ?? "http://localhost:8000/products");
  }

  public getProducts<T = any>() {
    return this.fetchClient.get<T>(`/`);
  }

  public getProductById<T = any>(id: string) {
    return this.fetchClient.get<T>(`/${id}`);
  }
}
