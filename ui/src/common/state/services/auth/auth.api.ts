/**
 * Pre-configure AuthApi client to extend ProtectedAPIClient
 */
import ProtectedAPIClient from "@/common/state/services/abstract/protected.api";

export default class AuthAPIClient extends ProtectedAPIClient {
  constructor(token: string, baseURL?: string) {
    super(token, baseURL ?? "http://localhost:8000/auth");
  }

  public checkIsAdmin<T = any>() {
    return this.fetchClient.get<T>(`/check-admin`);
  }
}
