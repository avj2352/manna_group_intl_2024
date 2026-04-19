/**
 * Order API client - authenticated endpoints for Stripe payment + order management
 */
import ProtectedAPIClient from "@/common/state/services/abstract/protected.api";
import {
  ICreatePaymentIntentRequest,
  ICreateOrderRequest,
} from "@/common/interfaces";

export default class OrderAPIClient extends ProtectedAPIClient {
  constructor(token: string, baseURL?: string) {
    super(token, baseURL ?? "http://localhost:8000/orders");
  }

  public createPaymentIntent<T = any>(payload: ICreatePaymentIntentRequest) {
    return this.fetchClient.post<T>(`/create-payment-intent`, payload);
  }

  public createOrder<T = any>(payload: ICreateOrderRequest) {
    return this.fetchClient.post<T>(`/`, payload);
  }

  public getMyOrders<T = any>() {
    return this.fetchClient.get<T>(`/my-orders`);
  }

  public getAllOrders<T = any>() {
    return this.fetchClient.get<T>(`/`);
  }
}
