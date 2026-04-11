import { FC, useEffect, Fragment } from "react";
// ..custom
import ProductsTableSection from "@/pages/admin/products/sections/Products.table.section";
import { useProductStore } from "@/common/state/features/products/product.slice";
import ProductPreviewSection from "@/pages/admin/products/sections/Product.preview.section";

const ProductsAdminPage: FC = () => {
  const { selected_product, resetDetails, resetSelectedProduct } = useProductStore();

  useEffect(()=>{
    return () => {
      resetDetails();
      resetSelectedProduct();
    }
  },[]);

  return (
    <section className="relative py-8 lg:py-24" id="products-admin-page">
      <div className="container relative z-10">
        <ProductsTableSection/>
        {Boolean(selected_product) ? <ProductPreviewSection
          selectedProduct={selected_product}
          isAdmin={true}/> : <Fragment/> }
      </div>
    </section>
  );
};

export default ProductsAdminPage;
