import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import ProductAdminAPIClient from "../../services/products/product.admin.api";
import ProductPublicAPIClient from "../../services/products/product.public.api";
import { IProductRequestPayload } from "@/common/interfaces";

const baseURL =
  import.meta.env.VITE_PRODUCTS_API_URL ?? "http://localhost:8000/products";

// ..API calls
export const fetchProductListAPI = createAsyncThunk(
  "product/fetchProductListAPI",
  async (): Promise<any> => {
    const productClient = new ProductPublicAPIClient(baseURL);
    const response = await productClient.getProducts();    
    return await response?.data;
  }
);

export const fetchProductDetailsByIdAPI = createAsyncThunk(
  "product/fetchProductDetailsByIdAPI",
  async ({ id }: { id: string }): Promise<any> => {
    const productClient = new ProductPublicAPIClient(baseURL);
    const response = await productClient.getProductById(id);    
    return await response?.data;
  }
);

export const fetchProductPostFormAPI = createAsyncThunk(
  "product/fetchProductPostFormAPI",
  async ({ token, payload }: { token: string, payload: IProductRequestPayload }): Promise<any> => {
    const productClient = new ProductAdminAPIClient(token, baseURL);
    const response = await productClient.addProduct(payload);    
    return await response?.data;
  }
);

export const fetchProductDeleteAPI = createAsyncThunk(
  "product/fetchProductDeleteAPI",
  async ({ token, id }: { token: string, id: string }): Promise<any> => {
    const productClient = new ProductAdminAPIClient(token, baseURL);
    const response = await productClient.deleteProductById(id);    
    return await response?.data;
  }
);

export type IProductState = {
  product_list_status: "initial" | "pending" | "fulfilled" | "rejected";
  product_details_status: "initial" | "pending" | "fulfilled" | "rejected";
  product_post_status: "initial" | "pending" | "fulfilled" | "rejected";  
  product_delete_status: "initial" | "pending" | "fulfilled" | "rejected";
  product_detail_record: unknown | undefined;
  product_details_response: string;
  product_post_response: string;  
  product_delete_response: string;
  product_list: unknown[];
};

export const initialState: IProductState = {
  product_list_status: "initial",
  product_details_status: "initial",
  product_post_status: "initial",  
  product_delete_status: "initial",
  product_detail_record: undefined,
  product_details_response: "",
  product_post_response: "",  
  product_delete_response: "",
  product_list: []
};

export const ProductSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    reset: (state, _: PayloadAction<{}>) => {
        state.product_list_status = "initial",
        state.product_details_status = "initial",
        state.product_post_status = "initial",  
        state.product_delete_status = "initial",
        state.product_detail_record = undefined,
        state.product_details_response = "",
        state.product_post_response = "",  
        state.product_delete_response = "",
        state.product_list = []
    },
    resetPost: (state, _: PayloadAction<{}>) => {
      state.product_post_status = "initial";
      state.product_post_response = "";
    },    
    resetDetails: (state, _: PayloadAction<{}>) => {
      state.product_details_status = "initial";
      state.product_detail_record = undefined;
      state.product_details_response = "";
    },
    resetDelete: (state, _: PayloadAction<{}>) => {
      state.product_delete_status = "initial";
      state.product_delete_response = "";
    }    
  },
  extraReducers: (builder) => {
    // fetchProductListAPI
    builder.addCase(fetchProductListAPI.pending, (state, _) => {
      state.product_list_status = "pending";
    });
    builder.addCase(fetchProductListAPI.fulfilled, (state, action) => {
      state.product_list_status = "fulfilled";
      state.product_list = action.payload?.message;
    });
    builder.addCase(fetchProductListAPI.rejected, (state, _) => {
      state.product_list_status = "rejected";
    });
    // fetchProductDetailsByIdAPI
    builder.addCase(fetchProductDetailsByIdAPI.pending, (state, _) => {
      state.product_details_status = "pending";
    });
    builder.addCase(fetchProductDetailsByIdAPI.fulfilled, (state, action) => {
      state.product_details_status = "fulfilled";
      state.product_detail_record = (action.payload?.message as unknown[])[0] ?? undefined;
      state.product_details_response = "success!";
    });
    builder.addCase(fetchProductDetailsByIdAPI.rejected, (state, action) => {
      state.product_details_status = "rejected";
      state.product_details_response = (action.payload as unknown as any)?.message ?? "Error fetching record details!";
    });
    // fetchProductPostFormAPI
    builder.addCase(fetchProductPostFormAPI.pending, (state, _) => {
      state.product_post_status = "pending";
    });
    builder.addCase(fetchProductPostFormAPI.fulfilled, (state, _) => {
      state.product_post_status = "fulfilled";
      state.product_post_response = "New Product record created successfully!";
    });
    builder.addCase(fetchProductPostFormAPI.rejected, (state, action) => {
      state.product_post_status = "rejected";
      state.product_post_response = (action.payload as unknown as any)?.message ?? "Error creating product record!";
    });   
    // fetchProductDeleteAPI
    builder.addCase(fetchProductDeleteAPI.pending, (state, _) => {
      state.product_delete_status = "pending";
    });
    builder.addCase(fetchProductDeleteAPI.fulfilled, (state, _) => {
      state.product_delete_status = "fulfilled";
      state.product_delete_response = "Product record delete successfully!";
    });
    builder.addCase(fetchProductDeleteAPI.rejected, (state, action) => {
      state.product_delete_status = "rejected";
      state.product_delete_response = (action.payload as unknown as any)?.message ?? "Error deleting product record!";
    });
  },
});

export default ProductSlice.reducer;
export const { reset, resetPost, resetDelete, resetDetails } = ProductSlice.actions;
