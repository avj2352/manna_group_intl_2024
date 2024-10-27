import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import AssetAPIClient from "../../services/assets/asset.api";
import { IAssetRecord, IAssetRequestPayload } from "@/common/interfaces";

const baseURL =
  import.meta.env.VITE_ASSETS_API_URL ?? "http://localhost:8000/assets";

// ..API calls
export const fetchAssetListAPI = createAsyncThunk(
  "asset/fetchAssetListAPI",
  async ({ token }: { token: string }): Promise<any> => {
    const assetClient = new AssetAPIClient(token, baseURL);
    const response = await assetClient.getAssets();    
    return await response?.data;
  }
);

export const fetchAssetDetailsByIdAPI = createAsyncThunk(
  "asset/fetchAssetDetailsByIdAPI",
  async ({ token, id }: { token: string, id: string }): Promise<any> => {
    const assetClient = new AssetAPIClient(token, baseURL);
    const response = await assetClient.getAssetById(id);    
    return await response?.data;
  }
);

export const fetchAssetPostFormAPI = createAsyncThunk(
  "asset/fetchAssetPostFormAPI",
  async ({ token, payload }: { token: string, payload: IAssetRequestPayload }): Promise<any> => {
    const assetClient = new AssetAPIClient(token, baseURL);
    const response = await assetClient.postAsset(payload);    
    return await response?.data;
  }
);

export const fetchAssetUpdateFormAPI = createAsyncThunk(
  "asset/fetchAssetUpdateFormAPI",
  async ({ token, id, payload }: { token: string, id: string, payload: IAssetRequestPayload }): Promise<any> => {
    const assetClient = new AssetAPIClient(token, baseURL);
    const response = await assetClient.updateAssetDetailsById(id, payload);    
    return await response?.data;
  }
);

export type IAssetState = {
  asset_list_status: "initial" | "pending" | "fulfilled" | "rejected";
  asset_details_status: "initial" | "pending" | "fulfilled" | "rejected";
  asset_post_status: "initial" | "pending" | "fulfilled" | "rejected";
  asset_update_status: "initial" | "pending" | "fulfilled" | "rejected";
  asset_detail_record: IAssetRecord | undefined;
  asset_details_response: string;
  asset_post_response: string;
  asset_update_response: string;
  asset_list: IAssetRecord[];
};

export const initialState: IAssetState = {
  asset_list_status: "initial",
  asset_details_status: "initial",
  asset_post_status: "initial",
  asset_update_status: "initial",
  asset_detail_record: undefined,
  asset_details_response: "",
  asset_post_response: "",
  asset_update_response: "",
  asset_list: []
};

export const AssetSlice = createSlice({
  name: "assetSlice",
  initialState,
  reducers: {
    reset: (state, _: PayloadAction<{}>) => {
      state.asset_list_status = "initial";
      state.asset_post_status = "initial";
      state.asset_update_status = "initial";
      state.asset_post_response = "";
      state.asset_update_response = "";
      state.asset_list = [];
    },
    resetPost: (state, _: PayloadAction<{}>) => {
      state.asset_post_status = "initial";
      state.asset_post_response = "";
    },
    resetUpdate: (state, _: PayloadAction<{}>) => {
      state.asset_update_status = "initial";
      state.asset_update_response = "";
    },
    resetDetail: (state, _: PayloadAction<{}>) => {
      state.asset_details_status = "initial";
      state.asset_detail_record = undefined;
      state.asset_details_response = "";
    },
  },
  extraReducers: (builder) => {
    // fetchAssetListAPI
    builder.addCase(fetchAssetListAPI.pending, (state, _) => {
      state.asset_list_status = "pending";
    });
    builder.addCase(fetchAssetListAPI.fulfilled, (state, action) => {
      state.asset_list_status = "fulfilled";
      state.asset_list = action.payload?.message;
    });
    builder.addCase(fetchAssetListAPI.rejected, (state, _) => {
      state.asset_list_status = "rejected";
    });
    // fetchAssetDetailsByIdAPI
    builder.addCase(fetchAssetDetailsByIdAPI.pending, (state, _) => {
      state.asset_details_status = "pending";
    });
    builder.addCase(fetchAssetDetailsByIdAPI.fulfilled, (state, action) => {
      state.asset_details_status = "fulfilled";
      state.asset_detail_record = (action.payload?.message as IAssetRecord[])[0] ?? undefined;
      state.asset_details_response = "success!";
    });
    builder.addCase(fetchAssetDetailsByIdAPI.rejected, (state, action) => {
      state.asset_details_status = "rejected";
      state.asset_details_response = (action.payload as unknown as any)?.message ?? "Error fetching record details!";
    });
    // fetchAssetPostFormAPI
    builder.addCase(fetchAssetPostFormAPI.pending, (state, _) => {
      state.asset_post_status = "pending";
    });
    builder.addCase(fetchAssetPostFormAPI.fulfilled, (state, _) => {
      state.asset_post_status = "fulfilled";
      state.asset_post_response = "New Asset record created successfully!";
    });
    builder.addCase(fetchAssetPostFormAPI.rejected, (state, action) => {
      state.asset_post_status = "rejected";
      state.asset_post_response = (action.payload as unknown as any)?.message ?? "Error creating asset record!";
    });
    // fetchAssetUpdateFormAPI
    builder.addCase(fetchAssetUpdateFormAPI.pending, (state, _) => {
      state.asset_update_status = "pending";
    });
    builder.addCase(fetchAssetUpdateFormAPI.fulfilled, (state, _) => {
      state.asset_update_status = "fulfilled";
      state.asset_update_response = "Asset record update successfully!";
    });
    builder.addCase(fetchAssetUpdateFormAPI.rejected, (state, action) => {
      state.asset_update_status = "rejected";
      state.asset_update_response = (action.payload as unknown as any)?.message ?? "Error updating asset record!";
    });
  },
});

export default AssetSlice.reducer;
export const { reset, resetPost, resetUpdate } = AssetSlice.actions;
