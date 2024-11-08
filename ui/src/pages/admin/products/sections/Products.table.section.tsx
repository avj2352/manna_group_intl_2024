import { useAppSelector } from "@/common/state/store";
import Loader from "@/components/loaders/Loader";
import { columns } from "@/components/tables/products/manage-products-table-column";
import { ProductsAdminTable } from "@/components/tables/products/ProductsAdmin.table";
import { FC, Fragment } from "react";

const ProductsTableSection: FC = () => {
    const productState = useAppSelector((state) => state.products);

    const isLoading = productState.product_list_status === "initial" ||
                      productState.product_list_status === "pending";                      

    return (<Fragment>
        <div className="flex flex-col text-base flex-start">
          <Loader display={isLoading} text="loading products"/>
          {!isLoading && <h3 className="mb-4 text-2xl">Your Products</h3>}
          {!isLoading && <p className="mb-4">Contains list of products shown in Manna group international products page</p>}
          {/* {!isLoading && <ProductsAdminTable columns={columns} data={productState.product_list}/>} */}
        </div>
    </Fragment>);
};

export default ProductsTableSection;