/**
 * Pre-configure ProductAdminAPIClient client to extend ProtectedAPIClient
 */
import { IPromotionRequestPayload } from "@/common/interfaces";
import ProtectedAPIClient from "@/common/state/services/abstract/protected.api";

export default class PromoAdminAPIClient extends ProtectedAPIClient {
  constructor(token: string, baseURL?: string) {    
    super(token, baseURL ?? 'http://localhost:8000/promotions');
    // ..init
  }

  public getPromotions<T = any>() {
    return this.axiosInstance.get<T>(`/`);
  }

  public getPromotionById<T = any>(id: string) {
    return this.axiosInstance.get<T>(`/details/${id}`);
  }

  public addPromotion<T = any>(payload: IPromotionRequestPayload) {
    return this.axiosInstance.post<T>(`/`, payload);
  }  

  public updatePromotionById<T = any>(id: string,payload: IPromotionRequestPayload) {
    return this.axiosInstance.put<T>(`/details/${id}`, payload);
  }  

  public deletePromotionById<T = any>(id: string) {
    return this.axiosInstance.delete<T>(`/${id}`);
  }
}
