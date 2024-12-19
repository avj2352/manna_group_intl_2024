import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import PromoAdminAPIClient from "../../services/promos/promo.admin.api";
import PromoPublicAPIClient from "../../services/promos/promo.public.api";
import { IPromotionRecord, IPromotionRequestPayload } from "@/common/interfaces";

const baseURL =
  import.meta.env.VITE_PROMOTIONS_API_URL ?? "http://localhost:8000/promotions";

// ..API calls
export const fetchPromoListAPI = createAsyncThunk(
  "promotions/fetchPromoListAPI",
  async ({ token }: { token: string }): Promise<any> => {
    const promoClient = new PromoAdminAPIClient(token, baseURL);
    const response = await promoClient.getPromotions();    
    return await response?.data;
  }
);

export const fetchPromoDetailsByIdAPI = createAsyncThunk(
  "promotions/fetchPromoDetailsByIdAPI",
  async ({ token, id }: { token: string, id: string }): Promise<any> => {
    const promoClient = new PromoAdminAPIClient(token, baseURL);
    const response = await promoClient.getPromotionById(id);    
    return await response?.data;
  }
);


export const fetchPromoCodeByNameAPI = createAsyncThunk(
    "promotions/fetchPromoCodeByNameAPI",
    async ({ promo_code }: { promo_code: string }): Promise<any> => {
      const promoClient = new PromoPublicAPIClient(baseURL);
      const response = await promoClient.queryPromoName(promo_code);    
      return await response?.data;
    }
);

export const fetchPromoPostFormAPI = createAsyncThunk(
  "promotions/fetchPromoPostFormAPI",
  async ({ token, payload }: { token: string, payload: IPromotionRequestPayload }): Promise<any> => {
    const promoClient = new PromoAdminAPIClient(token, baseURL);
    const response = await promoClient.addPromotion(payload);    
    return await response?.data;
  }
);


export const fetchPromoUpdateByIdAPI = createAsyncThunk(
    "promotions/fetchPromoUpdateByIdAPI",
    async ({ token, id, payload }: { token: string, id: string, payload: IPromotionRequestPayload }): Promise<any> => {
      const promoClient = new PromoAdminAPIClient(token, baseURL);
      const response = await promoClient.updatePromotionById(id, payload);    
      return await response?.data;
    }
  );

export const fetchPromoDeleteAPI = createAsyncThunk(
  "promotions/fetchPromoDeleteAPI",
  async ({ token, id }: { token: string, id: string }): Promise<any> => {
    const promoClient = new PromoAdminAPIClient(token, baseURL);
    const response = await promoClient.deletePromotionById(id);    
    return await response?.data;
  }
);

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

export const initialState: IPromoState = {
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
  selected_promo: undefined
};

export const PromoSlice = createSlice({
  name: "promoSlice",
  initialState,
  reducers: {
    reset: (state, _: PayloadAction<{}>) => {
        state.promo_list_status = "initial";
        state.promo_code_status = "initial";
        state.promo_details_status = "initial";
        state.promo_post_status = "initial";
        state.promo_update_status = "initial";
        state.promo_delete_status = "initial";
        state.promo_detail_record = undefined;
        state.promo_details_response = "";
        state.promo_post_response = "";
        state.promo_update_response = "";
        state.promo_delete_response = "";        
        state.promo_code = undefined;
        state.promo_list = [];
        state.selected_promo = undefined;
    },
    resetPost: (state, _: PayloadAction<{}>) => {
      state.promo_post_status = "initial";
      state.promo_post_response = "";
    },    
    resetDetails: (state, _: PayloadAction<{}>) => {
      state.promo_details_status = "initial";
      state.promo_detail_record = undefined;
      state.promo_details_response = "";
    },
    resetDelete: (state, _: PayloadAction<{}>) => {
      state.promo_delete_status = "initial";
      state.promo_delete_response = "";
    },
    setSelectedPromo: (state, action: PayloadAction<IPromotionRecord>) => {
      state.selected_promo = action.payload;
    },
    resetSelectedPromo: (state, _: PayloadAction<{}>) => {
      state.selected_promo = undefined;
    },
  },
  extraReducers: (builder) => {
    // fetchPromoListAPI
    builder.addCase(fetchPromoListAPI.pending, (state, _) => {
      state.promo_list_status = "pending";
    });
    builder.addCase(fetchPromoListAPI.fulfilled, (state, action) => {
      state.promo_list_status = "fulfilled";
      state.promo_list = action.payload?.message ?? [];
    });
    builder.addCase(fetchPromoListAPI.rejected, (state, _) => {
      state.promo_list_status = "rejected";
    });
    // fetchPromoDetailsByIdAPI
    builder.addCase(fetchPromoDetailsByIdAPI.pending, (state, _) => {
      state.promo_details_status = "pending";
    });
    builder.addCase(fetchPromoDetailsByIdAPI.fulfilled, (state, action) => {
      state.promo_details_status = "fulfilled";
      state.promo_detail_record = (action.payload?.message as unknown[])[0] ?? undefined;
      state.promo_details_response = "success!";
    });
    builder.addCase(fetchPromoDetailsByIdAPI.rejected, (state, action) => {
      state.promo_details_status = "rejected";
      state.promo_details_response = (action.payload as unknown as any)?.message ?? "Error fetching record details!";
    });
    // fetchPromoCodeByNameAPI
    builder.addCase(fetchPromoCodeByNameAPI.pending, (state, _) => {
      state.promo_code_status = "pending";
    });
    builder.addCase(fetchPromoCodeByNameAPI.fulfilled, (state, action) => {
      state.promo_code_status = "fulfilled";
      state.promo_code = action.payload?.message;
      state.promo_detail_record = (action.payload?.message as unknown[])[0] ?? undefined;
    });
    builder.addCase(fetchPromoCodeByNameAPI.rejected, (state, action) => {
      state.promo_code_status = "rejected";
      state.promo_details_response = (action.payload as unknown as any)?.message ?? "Error fetching record details!";
    });
    // fetchPromoUpdateByIdAPI
    builder.addCase(fetchPromoUpdateByIdAPI.pending, (state, _) => {
      state.promo_update_status = "pending";
    });
    builder.addCase(fetchPromoUpdateByIdAPI.fulfilled, (state, action) => {
      state.promo_update_status = "fulfilled";
      state.promo_detail_record = (action.payload?.message as unknown[])[0] ?? undefined;
      state.promo_update_response = "Promo record updated successfully!";
    });
    builder.addCase(fetchPromoUpdateByIdAPI.rejected, (state, action) => {
      state.promo_update_status = "rejected";
      state.promo_update_response = (action.payload as unknown as any)?.message ?? "Error updating promo record!";
    });
    // fetchPromoPostFormAPI
    builder.addCase(fetchPromoPostFormAPI.pending, (state, _) => {
      state.promo_post_status = "pending";
    });
    builder.addCase(fetchPromoPostFormAPI.fulfilled, (state, _) => {
      state.promo_post_status = "fulfilled";
      state.promo_post_response = "New Promo record created successfully!";
    });
    builder.addCase(fetchPromoPostFormAPI.rejected, (state, action) => {
      state.promo_post_status = "rejected";
      state.promo_post_response = (action.payload as unknown as any)?.message ?? "Error creating promo record!";
    });   
    // fetchPromoDeleteAPI
    builder.addCase(fetchPromoDeleteAPI.pending, (state, _) => {
      state.promo_delete_status = "pending";
    });
    builder.addCase(fetchPromoDeleteAPI.fulfilled, (state, _) => {
      state.promo_delete_status = "fulfilled";
      state.promo_delete_response = "Promo record delete successfully!";
    });
    builder.addCase(fetchPromoDeleteAPI.rejected, (state, action) => {
      state.promo_delete_status = "rejected";
      state.promo_delete_response = (action.payload as unknown as any)?.message ?? "Error deleting promo record!";
    });
  },
});

export default PromoSlice.reducer;
export const { reset, resetPost, resetDelete, resetDetails, setSelectedPromo, resetSelectedPromo } = PromoSlice.actions;
