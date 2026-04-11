import { FC, Fragment, useEffect, useCallback } from "react";
// ..custom
import { useProductStore } from "@/common/state/features/products/product.slice";
import Loader from "@/components/loaders/Loader";
import { columns } from "@/components/tables/products/manage-products-table-column";
import { ProductsAdminTable } from "@/components/tables/products/ProductsAdmin.table";
import { useToast } from "@/hooks/use-toast";

const ProductsTableSection: FC = () => {
  const { toast } = useToast();
  const { product_list, product_list_status, product_delete_status, fetchProductListAPI, resetDelete } = useProductStore();

  const fetchProductListAPIHandler = useCallback(() => {
    fetchProductListAPI();
  }, []);

  useEffect(() => {
    fetchProductListAPIHandler();
  }, []);

  useEffect(() => {
    if (product_delete_status === "fulfilled") {
      toast({
        variant: "default",
        title: "Success",
        description: `Asset record has been deleted!`,
      });
      resetDelete();
      fetchProductListAPIHandler();
    }
    if (product_delete_status === "rejected") {
      toast({
        variant: "danger",
        title: "Error",
        description: `Error deleting asset record!`,
      });
      resetDelete();
    }
  }, [product_delete_status]);

  const isLoading =
    product_list_status === "initial" ||
    product_list_status === "pending" ||
    product_delete_status === "pending";

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
            data={product_list}
          />
        )}
      </div>
    </Fragment>
  );
};

export default ProductsTableSection;
