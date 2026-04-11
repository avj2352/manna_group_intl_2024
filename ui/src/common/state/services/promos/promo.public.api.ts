/**
 * Pre-configure PromoPublicAPIClient client to extend PublicAPIClient
 */
import PublicAPIClient from "@/common/state/services/abstract/public.api";

export default class PromoPublicAPIClient extends PublicAPIClient {
  constructor(baseURL?: string) {
    super(baseURL ?? "http://localhost:8000/promotions");
  }

  public queryPromoName<T = any>(id: string) {
    return this.fetchClient.put<T>(`/query/${id}`, {
      curr_date: new Date().toISOString(),
    });
  }
}
