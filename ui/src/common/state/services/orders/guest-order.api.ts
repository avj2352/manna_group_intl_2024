/**
 * Guest Order API client - unauthenticated endpoints for guest checkout
 */
import PublicAPIClient from "@/common/state/services/abstract/public.api";
import {
  ICreatePaymentIntentRequest,
  ICreateOrderRequest,
} from "@/common/interfaces";

export default class GuestOrderAPIClient extends PublicAPIClient {
  constructor(baseURL?: string) {
    super(baseURL ?? "http://localhost:8000/orders");
  }

  public createPaymentIntent<T>(payload: ICreatePaymentIntentRequest): Promise<{ data: T }> {
    return this.fetchClient.post<T>(`/guest/create-payment-intent`, payload);
  }

  public createOrder<T>(payload: ICreateOrderRequest): Promise<{ data: T }> {
    return this.fetchClient.post<T>(`/guest`, payload);
  }
}
