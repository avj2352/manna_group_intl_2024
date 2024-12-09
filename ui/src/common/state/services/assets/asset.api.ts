/**
 * Pre-configure AssetAPI client to extend ProtectedAPIClient
 */
import { IAssetRequestPayload } from "@/common/interfaces";
import ProtectedAPIClient from "@/common/state/services/abstract/protected.api";

export default class AssetAPIClient extends ProtectedAPIClient {
  constructor(token: string, baseURL?: string) {    
    super(token, baseURL ?? 'http://localhost:8000/assets');
    // ..init
  }  

  public getAssetById<T = any>(id: string) {
    return this.axiosInstance.get<T>(`/${id}`);
  }

  public postAsset<T = any>(payload: IAssetRequestPayload) {
    return this.axiosInstance.post<T>(`/`, payload);
  }

  public updateAssetDetailsById<T = any>(id: string, payload: IAssetRequestPayload) {
    return this.axiosInstance.put<T>(`/details/${id}`, payload);
  }

  public updateAssetPositionById<T = any>(id: string, position: number) {
    return this.axiosInstance.put<T>(`/position/${id}?position=${position}`);
  }

  public deleteAssetById<T = any>(id: string) {
    return this.axiosInstance.delete<T>(`/${id}`);
  }
}
