import { FC } from "react";
// ..custom
import ProductsTableSection from "@/pages/admin/products/sections/Products.table.section";

const ProductsAdminPage: FC = () => {
  return (
    <section className="relative py-8 lg:py-24" id="products-admin-page">
      <div className="container relative z-10">
        <ProductsTableSection/>
      </div>
    </section>
  );
};

export default ProductsAdminPage;
