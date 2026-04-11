/**
 * Asset state store (Zustand)
 */
import { create } from "zustand";
import AssetAPIClient from "@/common/state/services/assets/asset.api";
import AssetPublicAPIClient from "@/common/state/services/assets/asset.public.api";
import { IAssetRecord, IAssetRequestPayload } from "@/common/interfaces";
import { VITE_ASSETS_API_URL } from "@/util/envConfig";

export type IAssetState = {
  asset_list_status: "initial" | "pending" | "fulfilled" | "rejected";
  asset_details_status: "initial" | "pending" | "fulfilled" | "rejected";
  asset_post_status: "initial" | "pending" | "fulfilled" | "rejected";
  asset_update_status: "initial" | "pending" | "fulfilled" | "rejected";
  asset_delete_status: "initial" | "pending" | "fulfilled" | "rejected";
  asset_detail_record: IAssetRecord | undefined;
  asset_details_response: string;
  asset_post_response: string;
  asset_update_response: string;
  asset_delete_response: string;
  asset_list: IAssetRecord[];
};

type AssetStore = IAssetState & {
  reset: () => void;
  resetPost: () => void;
  resetUpdate: () => void;
  resetDetail: () => void;
  resetDelete: () => void;
  resetDetails: () => void;
  fetchAssetListAPI: () => Promise<void>;
  fetchAssetDetailsByIdAPI: (params: { token: string; id: string }) => Promise<void>;
  fetchAssetPostFormAPI: (params: { token: string; payload: IAssetRequestPayload }) => Promise<void>;
  fetchAssetUpdateFormAPI: (params: { token: string; id: string; payload: IAssetRequestPayload }) => Promise<void>;
  fetchAssetDeleteAPI: (params: { token: string; id: string }) => Promise<void>;
};

const initialState: IAssetState = {
  asset_list_status: "initial",
  asset_details_status: "initial",
  asset_post_status: "initial",
  asset_update_status: "initial",
  asset_delete_status: "initial",
  asset_detail_record: undefined,
  asset_details_response: "",
  asset_post_response: "",
  asset_update_response: "",
  asset_delete_response: "",
  asset_list: [],
};

export const useAssetStore = create<AssetStore>((set) => ({
  ...initialState,
  reset: () => set({
    asset_list_status: "initial",
    asset_post_status: "initial",
    asset_update_status: "initial",
    asset_post_response: "",
    asset_update_response: "",
    asset_list: [],
  }),
  resetPost: () => set({ asset_post_status: "initial", asset_post_response: "" }),
  resetUpdate: () => set({ asset_update_status: "initial", asset_update_response: "" }),
  resetDetail: () => set({ asset_details_status: "initial", asset_detail_record: undefined, asset_details_response: "" }),
  resetDelete: () => set({ asset_delete_status: "initial", asset_delete_response: "" }),
  resetDetails: () => set({ asset_details_status: "initial", asset_detail_record: undefined, asset_details_response: "" }),

  fetchAssetListAPI: async () => {
    set({ asset_list_status: "pending" });
    try {
      const client = new AssetPublicAPIClient(VITE_ASSETS_API_URL);
      const response = await client.getAssets();
      set({ asset_list_status: "fulfilled", asset_list: response.data?.message ?? [] });
    } catch {
      set({ asset_list_status: "rejected" });
    }
  },

  fetchAssetDetailsByIdAPI: async ({ token, id }) => {
    set({ asset_details_status: "pending" });
    try {
      const client = new AssetAPIClient(token, VITE_ASSETS_API_URL);
      const response = await client.getAssetById(id);
      const records = response.data?.message as IAssetRecord[];
      set({
        asset_details_status: "fulfilled",
        asset_detail_record: records?.[0] ?? undefined,
        asset_details_response: "success!",
      });
    } catch {
      set({ asset_details_status: "rejected", asset_details_response: "Error fetching record details!" });
    }
  },

  fetchAssetPostFormAPI: async ({ token, payload }) => {
    set({ asset_post_status: "pending" });
    try {
      const client = new AssetAPIClient(token, VITE_ASSETS_API_URL);
      await client.postAsset(payload);
      set({ asset_post_status: "fulfilled", asset_post_response: "New Asset record created successfully!" });
    } catch {
      set({ asset_post_status: "rejected", asset_post_response: "Error creating asset record!" });
    }
  },

  fetchAssetUpdateFormAPI: async ({ token, id, payload }) => {
    set({ asset_update_status: "pending" });
    try {
      const client = new AssetAPIClient(token, VITE_ASSETS_API_URL);
      await client.updateAssetDetailsById(id, payload);
      set({ asset_update_status: "fulfilled", asset_update_response: "Asset record update successfully!" });
    } catch {
      set({ asset_update_status: "rejected", asset_update_response: "Error updating asset record!" });
    }
  },

  fetchAssetDeleteAPI: async ({ token, id }) => {
    set({ asset_delete_status: "pending" });
    try {
      const client = new AssetAPIClient(token, VITE_ASSETS_API_URL);
      await client.deleteAssetById(id);
      set({ asset_delete_status: "fulfilled", asset_delete_response: "Asset record delete successfully!" });
    } catch {
      set({ asset_delete_status: "rejected", asset_delete_response: "Error deleting asset record!" });
    }
  },
}));
