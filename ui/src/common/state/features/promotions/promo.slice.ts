/**
 * Promotions state store (Zustand)
 */
import { create } from "zustand";
import PromoAdminAPIClient from "@/common/state/services/promos/promo.admin.api";
import PromoPublicAPIClient from "@/common/state/services/promos/promo.public.api";
import { IPromotionRecord, IPromotionRequestPayload } from "@/common/interfaces";
import { VITE_PROMOTIONS_API_URL } from "@/util/envConfig";

export type IPromoState = {
  promo_list_status: "initial" | "pending" | "fulfilled" | "rejected";
  promo_code_status: "initial" | "pending" | "fulfilled" | "rejected";
  promo_details_status: "initial" | "pending" | "fulfilled" | "rejected";
  promo_post_status: "initial" | "pending" | "fulfilled" | "rejected";
  promo_update_status: "initial" | "pending" | "fulfilled" | "rejected";
  promo_delete_status: "initial" | "pending" | "fulfilled" | "rejected";
  promo_detail_record: unknown | undefined;
  promo_details_response: string;
  promo_post_response: string;
  promo_update_response: string;
  promo_delete_response: string;
  promo_list: IPromotionRecord[];
  promo_code: {} | undefined;
  selected_promo: IPromotionRecord | undefined;
};

type PromoStore = IPromoState & {
  reset: () => void;
  resetPost: () => void;
  resetDetails: () => void;
  resetDelete: () => void;
  setSelectedPromo: (promo: IPromotionRecord) => void;
  resetSelectedPromo: () => void;
  fetchPromoListAPI: (params: { token: string }) => Promise<void>;
  fetchPromoDetailsByIdAPI: (params: { token: string; id: string }) => Promise<void>;
  fetchPromoCodeByNameAPI: (params: { promo_code: string }) => Promise<void>;
  fetchPromoPostFormAPI: (params: { token: string; payload: IPromotionRequestPayload }) => Promise<void>;
  fetchPromoUpdateByIdAPI: (params: { token: string; id: string; payload: IPromotionRequestPayload }) => Promise<void>;
  fetchPromoDeleteAPI: (params: { token: string; id: string }) => Promise<void>;
};

const initialState: IPromoState = {
  promo_list_status: "initial",
  promo_code_status: "initial",
  promo_details_status: "initial",
  promo_post_status: "initial",
  promo_update_status: "initial",
  promo_delete_status: "initial",
  promo_detail_record: undefined,
  promo_details_response: "",
  promo_post_response: "",
  promo_update_response: "",
  promo_delete_response: "",
  promo_list: [],
  promo_code: undefined,
  selected_promo: undefined,
};

export const usePromoStore = create<PromoStore>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  resetPost: () => set({ promo_post_status: "initial", promo_post_response: "" }),
  resetDetails: () => set({ promo_details_status: "initial", promo_detail_record: undefined, promo_details_response: "" }),
  resetDelete: () => set({ promo_delete_status: "initial", promo_delete_response: "" }),
  setSelectedPromo: (promo) => set({ selected_promo: promo }),
  resetSelectedPromo: () => set({ selected_promo: undefined }),

  fetchPromoListAPI: async ({ token }) => {
    set({ promo_list_status: "pending" });
    try {
      const client = new PromoAdminAPIClient(token, VITE_PROMOTIONS_API_URL);
      const response = await client.getPromotions();
      set({ promo_list_status: "fulfilled", promo_list: response.data?.message ?? [] });
    } catch {
      set({ promo_list_status: "rejected" });
    }
  },

  fetchPromoDetailsByIdAPI: async ({ token, id }) => {
    set({ promo_details_status: "pending" });
    try {
      const client = new PromoAdminAPIClient(token, VITE_PROMOTIONS_API_URL);
      const response = await client.getPromotionById(id);
      const records = response.data?.message as unknown[];
      set({
        promo_details_status: "fulfilled",
        promo_detail_record: records?.[0] ?? undefined,
        promo_details_response: "success!",
      });
    } catch {
      set({ promo_details_status: "rejected", promo_details_response: "Error fetching record details!" });
    }
  },

  fetchPromoCodeByNameAPI: async ({ promo_code }) => {
    set({ promo_code_status: "pending" });
    try {
      const client = new PromoPublicAPIClient(VITE_PROMOTIONS_API_URL);
      const response = await client.queryPromoName(promo_code);
      const records = response.data?.message as unknown[];
      set({
        promo_code_status: "fulfilled",
        promo_code: response.data?.message,
        promo_detail_record: records?.[0] ?? undefined,
      });
    } catch {
      set({ promo_code_status: "rejected", promo_details_response: "Error fetching promo code!" });
    }
  },

  fetchPromoPostFormAPI: async ({ token, payload }) => {
    set({ promo_post_status: "pending" });
    try {
      const client = new PromoAdminAPIClient(token, VITE_PROMOTIONS_API_URL);
      await client.addPromotion(payload);
      set({ promo_post_status: "fulfilled", promo_post_response: "New Promo record created successfully!" });
    } catch {
      set({ promo_post_status: "rejected", promo_post_response: "Error creating promo record!" });
    }
  },

  fetchPromoUpdateByIdAPI: async ({ token, id, payload }) => {
    set({ promo_update_status: "pending" });
    try {
      const client = new PromoAdminAPIClient(token, VITE_PROMOTIONS_API_URL);
      const response = await client.updatePromotionById(id, payload);
      const records = response.data?.message as unknown[];
      set({
        promo_update_status: "fulfilled",
        promo_detail_record: records?.[0] ?? undefined,
        promo_update_response: "Promo record updated successfully!",
      });
    } catch {
      set({ promo_update_status: "rejected", promo_update_response: "Error updating promo record!" });
    }
  },

  fetchPromoDeleteAPI: async ({ token, id }) => {
    set({ promo_delete_status: "pending" });
    try {
      const client = new PromoAdminAPIClient(token, VITE_PROMOTIONS_API_URL);
      await client.deletePromotionById(id);
      set({ promo_delete_status: "fulfilled", promo_delete_response: "Promo record delete successfully!" });
    } catch {
      set({ promo_delete_status: "rejected", promo_delete_response: "Error deleting promo record!" });
    }
  },
}));
