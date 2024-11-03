/**
 * Pre-configure ProductPublicAPIClient client to extend PublicAPIClient
 */
import { IProductRequestPayload } from "@/common/interfaces";
import PublicAPIClient from "@/common/state/services/abstract/public.api";

export default class ProductPublicAPIClient extends PublicAPIClient {
  constructor(baseURL?: string) {    
    super(baseURL ?? 'http://localhost:8000/products');
    // ..init
  }

  public getProducts<T = any>() {
    return this.axiosInstance.get<T>(`/`);
  }

  public getProductById<T = any>(id: string) {
    return this.axiosInstance.get<T>(`/${id}`);
  }

}
