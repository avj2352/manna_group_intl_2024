/**
 * Pre-configure ProductPublicAPIClient client to extend PublicAPIClient
 */
import PublicAPIClient from "@/common/state/services/abstract/public.api";

export default class PromoPublicAPIClient extends PublicAPIClient {
  constructor(baseURL?: string) {    
    super(baseURL ?? 'http://localhost:8000/promotions');
    // ..init
  }

  public queryPromoName<T = any>(id: string) {
    return this.axiosInstance.put<T>(`/query/${id}`, {
        "curr_date": new Date().toISOString()
    });
  }

}
