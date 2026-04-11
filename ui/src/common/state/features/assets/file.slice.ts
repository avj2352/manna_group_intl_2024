/**
 * S3 Files state store (Zustand)
 */
import { create } from "zustand";
import FilesAPIClient from "@/common/state/services/assets/files.api";
import { IFileResponseRecord } from "@/common/interfaces";
import { VITE_FILES_API_URL } from "@/util/envConfig";

export const MANNA_IMAGES_BUCKET = "manna-app-images-bucket";
export const MANNA_FILES_BUCKET = "manna-app-files-bucket";

export type IFileState = {
  files_list_status: "initial" | "pending" | "fulfilled" | "rejected";
  files_list: IFileResponseRecord[];
};

type FileStore = IFileState & {
  reset: () => void;
  fetchFilesAPI: (params: { token: string; bucket: string }) => Promise<void>;
};

const initialState: IFileState = {
  files_list_status: "initial",
  files_list: [],
};

export const useFileStore = create<FileStore>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  fetchFilesAPI: async ({ token, bucket }) => {
    set({ files_list_status: "pending" });
    try {
      const client = new FilesAPIClient(token, VITE_FILES_API_URL);
      const response = await client.getFiles(bucket);
      set({ files_list_status: "fulfilled", files_list: response.data?.message ?? [] });
    } catch {
      set({ files_list_status: "rejected" });
    }
  },
}));
