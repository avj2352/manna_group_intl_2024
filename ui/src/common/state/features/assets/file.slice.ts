import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import FilesAPIClient from "../../services/assets/files.api";
import { IFileResponseRecord } from "@/common/interfaces";

const baseURL =
  import.meta.env.VITE_FILES_API_URL ?? "http://localhost:8000/files";

export const MANNA_IMAGES_BUCKET = "manna-app-images-bucket";
export const MANNA_FILES_BUCKET = "manna-app-files-bucket";


// ..API calls
export const fetchFilesAPI = createAsyncThunk(
  "asset/fetchFilesAPI",
  async ({ token, bucket }: { token: string, bucket: string }): Promise<any> => {
    const filesApiClient = new FilesAPIClient(token, baseURL);
    const response = await filesApiClient.getFiles(bucket);    
    return await response?.data;
  }
);

export type IFileState = {
  files_list_status: "initial" | "pending" | "fulfilled" | "rejected";    
  files_list: IFileResponseRecord[];
};

export const initialState: IFileState = {
  files_list_status: "initial",
  files_list: []
};

export const S3FilesSlice = createSlice({
  name: "S3FilesSlice",
  initialState,
  reducers: {
    reset: (state, _: PayloadAction<{}>) => {
      state.files_list_status = "initial";      
      state.files_list = [];
    },        
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilesAPI.pending, (state, _) => {
      state.files_list_status = "pending";
    });
    builder.addCase(fetchFilesAPI.fulfilled, (state, action) => {
      state.files_list_status = "fulfilled";
      state.files_list = action.payload?.message;
    });
    builder.addCase(fetchFilesAPI.rejected, (state, _) => {
      state.files_list_status = "rejected";
    });
  },
});

export default S3FilesSlice.reducer;
export const { reset } = S3FilesSlice.actions;
