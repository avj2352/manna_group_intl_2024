import { FC, useEffect } from "react";
// ..custom
import ProductsTableSection from "@/pages/admin/products/sections/Products.table.section";
import { resetDetails } from "@/common/state/features/products/product.slice";
import { useAppDispatch } from "@/common/state/store";

const ProductsAdminPage: FC = () => {
  const dispatch = useAppDispatch();  

  useEffect(()=>{
    return () => {
      dispatch(resetDetails({}));
    }
  },[]);

  return (
    <section className="relative py-8 lg:py-24" id="products-admin-page">
      <div className="container relative z-10">
        <ProductsTableSection/>
      </div>
    </section>
  );
};

export default ProductsAdminPage;
