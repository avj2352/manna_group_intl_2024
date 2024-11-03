/**
 * Pre-configure ProductAdminAPIClient client to extend ProtectedAPIClient
 */
import { IProductRequestPayload } from "@/common/interfaces";
import ProtectedAPIClient from "@/common/state/services/abstract/protected.api";

export default class ProductAdminAPIClient extends ProtectedAPIClient {
  constructor(token: string, baseURL?: string) {    
    super(token, baseURL ?? 'http://localhost:8000/products');
    // ..init
  }

  public addProduct<T = any>(payload: IProductRequestPayload) {
    return this.axiosInstance.post<T>(`/`, payload);
  }  

  public deleteProductById<T = any>(id: string) {
    return this.axiosInstance.delete<T>(`/${id}`);
  }
}
