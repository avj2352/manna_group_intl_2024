/**
 * Pre-configure FilesAPI client to extend ProtectedAPIClient
 */
import ProtectedAPIClient from "@/common/state/services/abstract/protected.api";

export default class FilesAPIClient extends ProtectedAPIClient {
  constructor(token: string, baseURL?: string) {
    super(token, baseURL ?? "http://localhost:8000/files");
  }

  public getFiles<T = any>(bucket: string) {
    return this.fetchClient.get<T>(`/?bucket_name=${bucket}`);
  }

  public uploadFile<T = any>(payload: FormData | unknown) {
    return this.fetchClient.post<T>(`/`, payload);
  }

  public deleteFilesById<T = any>(id: string) {
    return this.fetchClient.delete<T>(`/${id}`);
  }
}
