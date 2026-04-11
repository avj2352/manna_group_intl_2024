/**
 * Pre-configure PromoAdminAPIClient client to extend ProtectedAPIClient
 */
import { IPromotionRequestPayload } from "@/common/interfaces";
import ProtectedAPIClient from "@/common/state/services/abstract/protected.api";

export default class PromoAdminAPIClient extends ProtectedAPIClient {
  constructor(token: string, baseURL?: string) {
    super(token, baseURL ?? "http://localhost:8000/promotions");
  }

  public getPromotions<T = any>() {
    return this.fetchClient.get<T>(`/`);
  }

  public getPromotionById<T = any>(id: string) {
    return this.fetchClient.get<T>(`/details/${id}`);
  }

  public addPromotion<T = any>(payload: IPromotionRequestPayload) {
    return this.fetchClient.post<T>(`/`, payload);
  }

  public updatePromotionById<T = any>(id: string, payload: IPromotionRequestPayload) {
    return this.fetchClient.put<T>(`/details/${id}`, payload);
  }

  public deletePromotionById<T = any>(id: string) {
    return this.fetchClient.delete<T>(`/${id}`);
  }
}
