import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import AssetAPIClient from "../../services/assets/asset.api";
import { IAssetRecord } from "@/common/interfaces";

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

export type IAssetState = {
  asset_list_status: "initial" | "pending" | "fulfilled" | "rejected";    
  asset_list: IAssetRecord[];
};

export const initialState: IAssetState = {
  asset_list_status: "initial",
  asset_list: []
};

export const AssetSlice = createSlice({
  name: "assetSlice",
  initialState,
  reducers: {
    reset: (state, _: PayloadAction<{}>) => {
      state.asset_list_status = "initial";      
      state.asset_list = [];
    },        
  },
  extraReducers: (builder) => {
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
  },
});

export default AssetSlice.reducer;
export const { reset } = AssetSlice.actions;
