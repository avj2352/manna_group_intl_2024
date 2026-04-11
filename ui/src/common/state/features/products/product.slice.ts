/**
 * Product state store (Zustand)
 */
import { create } from "zustand";
import ProductAdminAPIClient from "@/common/state/services/products/product.admin.api";
import ProductPublicAPIClient from "@/common/state/services/products/product.public.api";
import { IProductRecord, IProductRequestPayload } from "@/common/interfaces";
import { VITE_PRODUCTS_API_URL } from "@/util/envConfig";

export type IProductState = {
  product_list_status: "initial" | "pending" | "fulfilled" | "rejected";
  product_details_status: "initial" | "pending" | "fulfilled" | "rejected";
  product_post_status: "initial" | "pending" | "fulfilled" | "rejected";
  product_delete_status: "initial" | "pending" | "fulfilled" | "rejected";
  product_detail_record: unknown | undefined;
  product_details_response: string;
  product_post_response: string;
  product_delete_response: string;
  product_list: IProductRecord[];
  selected_product: IProductRecord | undefined;
};

type ProductStore = IProductState & {
  reset: () => void;
  resetPost: () => void;
  resetDetails: () => void;
  resetDelete: () => void;
  setSelectedProduct: (product: IProductRecord) => void;
  resetSelectedProduct: () => void;
  fetchProductListAPI: () => Promise<void>;
  fetchProductDetailsByIdAPI: (params: { id: string }) => Promise<void>;
  fetchProductPostFormAPI: (params: { token: string; payload: IProductRequestPayload }) => Promise<void>;
  fetchProductDeleteAPI: (params: { token: string; id: string }) => Promise<void>;
};

const initialState: IProductState = {
  product_list_status: "initial",
  product_details_status: "initial",
  product_post_status: "initial",
  product_delete_status: "initial",
  product_detail_record: undefined,
  product_details_response: "",
  product_post_response: "",
  product_delete_response: "",
  product_list: [],
  selected_product: undefined,
};

export const useProductStore = create<ProductStore>((set) => ({
  ...initialState,
  reset: () => set(initialState),
  resetPost: () => set({ product_post_status: "initial", product_post_response: "" }),
  resetDetails: () => set({ product_details_status: "initial", product_detail_record: undefined, product_details_response: "" }),
  resetDelete: () => set({ product_delete_status: "initial", product_delete_response: "" }),
  setSelectedProduct: (product) => set({ selected_product: product }),
  resetSelectedProduct: () => set({ selected_product: undefined }),

  fetchProductListAPI: async () => {
    set({ product_list_status: "pending" });
    try {
      const client = new ProductPublicAPIClient(VITE_PRODUCTS_API_URL);
      const response = await client.getProducts();
      set({ product_list_status: "fulfilled", product_list: response.data?.message ?? [] });
    } catch {
      set({ product_list_status: "rejected" });
    }
  },

  fetchProductDetailsByIdAPI: async ({ id }) => {
    set({ product_details_status: "pending" });
    try {
      const client = new ProductPublicAPIClient(VITE_PRODUCTS_API_URL);
      const response = await client.getProductById(id);
      const records = response.data?.message as unknown[];
      set({
        product_details_status: "fulfilled",
        product_detail_record: records?.[0] ?? undefined,
        product_details_response: "success!",
      });
    } catch {
      set({ product_details_status: "rejected", product_details_response: "Error fetching record details!" });
    }
  },

  fetchProductPostFormAPI: async ({ token, payload }) => {
    set({ product_post_status: "pending" });
    try {
      const client = new ProductAdminAPIClient(token, VITE_PRODUCTS_API_URL);
      await client.addProduct(payload);
      set({ product_post_status: "fulfilled", product_post_response: "New Product record created successfully!" });
    } catch {
      set({ product_post_status: "rejected", product_post_response: "Error creating product record!" });
    }
  },

  fetchProductDeleteAPI: async ({ token, id }) => {
    set({ product_delete_status: "pending" });
    try {
      const client = new ProductAdminAPIClient(token, VITE_PRODUCTS_API_URL);
      await client.deleteProductById(id);
      set({ product_delete_status: "fulfilled", product_delete_response: "Product record delete successfully!" });
    } catch {
      set({ product_delete_status: "rejected", product_delete_response: "Error deleting product record!" });
    }
  },
}));
