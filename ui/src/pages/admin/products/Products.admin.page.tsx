import { FC, useEffect, Fragment } from "react";
// ..custom
import ProductsTableSection from "@/pages/admin/products/sections/Products.table.section";
import { resetDetails, resetSelectedProduct } from "@/common/state/features/products/product.slice";
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import ProductPreviewSection from "@/pages/admin/products/sections/Product.preview.section";

const ProductsAdminPage: FC = () => {
  const dispatch = useAppDispatch();
  const productState = useAppSelector(state => state.products);

  useEffect(()=>{
    return () => {
      dispatch(resetDetails({}));
      dispatch(resetSelectedProduct({}));
    }
  },[]);

  return (
    <section className="relative py-8 lg:py-24" id="products-admin-page">
      <div className="container relative z-10">
        <ProductsTableSection/>
        {Boolean(productState.selected_product) ? <ProductPreviewSection
          selectedProduct={productState.selected_product} 
          isAdmin={true}/> : <Fragment/> }
      </div>
    </section>
  );
};

export default ProductsAdminPage;
