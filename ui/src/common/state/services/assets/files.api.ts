/**
 * Pre-configure FilesAPI client to extend ProtectedAPIClient
 */
import ProtectedAPIClient from "@/common/state/services/abstract/protected.api";

export default class FilesAPIClient extends ProtectedAPIClient {
  constructor(token: string, baseURL?: string) {    
    super(token, baseURL ?? 'http://localhost:8000/files');
    // ..init
  }

  public getFiles<T = any>(bucket: string) {
    return this.axiosInstance.get<T>(`/?bucket_name=${bucket}`);
  }

  public uploadFile<T = any>(payload) {
    return this.axiosInstance.post<T>(`/`, payload);
  }  

  public deleteFilesById<T = any>(id: string) {
    return this.axiosInstance.delete<T>(`/${id}`);
  }
}
