/**
 * Pre-configure AssetPublicAPI client to extend PublicAPIClient
 */
import PublicAPIClient from "../abstract/public.api";

export default class AssetPublicAPIClient extends PublicAPIClient {
  constructor(baseURL?: string) {
    super(baseURL ?? "http://localhost:8000/assets");
  }

  public getAssets<T = any>() {
    return this.fetchClient.get<T>(`/`);
  }
}
