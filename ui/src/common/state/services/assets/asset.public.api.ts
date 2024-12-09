/**
 * Pre-configure AssetPublicAPI client to extend ProtectedAPIClient
 */
import PublicAPIClient from "../abstract/public.api";

export default class AssetPublicAPIClient extends PublicAPIClient {
  constructor(baseURL?: string) {    
    super(baseURL ?? 'http://localhost:8000/assets');
    // ..init
  }

  public getAssets<T = any>() {
    return this.axiosInstance.get<T>(`/`);
  }
}
