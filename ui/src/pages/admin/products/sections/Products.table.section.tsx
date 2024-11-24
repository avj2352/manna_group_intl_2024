import { FC, Fragment, useEffect, useCallback } from "react";
// ..custom
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import Loader from "@/components/loaders/Loader";
import { columns } from "@/components/tables/products/manage-products-table-column";
import { ProductsAdminTable } from "@/components/tables/products/ProductsAdmin.table";
import {
  fetchProductListAPI,
  resetDelete,
} from "@/common/state/features/products/product.slice";
import { useToast } from "@/hooks/use-toast";

const ProductsTableSection: FC = () => {
  const { toast } = useToast();
  const productState = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const fetchProductListAPIHandler = useCallback(() => {
    dispatch(fetchProductListAPI());
  }, []);

  useEffect(() => {
    fetchProductListAPIHandler();
  }, []);

  useEffect(() => {
    if (productState.product_delete_status === "fulfilled") {
      toast({
        variant: "default",
        title: "Success",
        description: `Asset record has been deleted!`,
      });
      dispatch(resetDelete({}));
      fetchProductListAPIHandler();
    }
    if (productState.product_delete_status === "rejected") {
      toast({
        variant: "danger",
        title: "Error",
        description: `Error deleting asset record!`,
      });
      dispatch(resetDelete({}));
    }
  }, [productState.product_delete_status]);

  const isLoading =
    productState.product_list_status === "initial" ||
    productState.product_list_status === "pending" ||
    productState.product_delete_status === "pending";

  return (
    <Fragment>
      <div className="flex flex-col text-base flex-start">
        <Loader display={isLoading} text="loading products" />
        {!isLoading && <h3 className="mb-4 text-2xl">Your Products</h3>}
        {!isLoading && (
          <p className="mb-4">
            Contains list of products shown in Manna group international
            products page
          </p>
        )}
        {!isLoading && (
          <ProductsAdminTable
            columns={columns}
            data={productState.product_list}
          />
        )}
      </div>
    </Fragment>
  );
};

export default ProductsTableSection;
