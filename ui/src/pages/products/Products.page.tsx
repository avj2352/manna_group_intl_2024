import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCheckoutStore } from "@/common/state/features/checkout/checkout.slice";
import { useProductStore } from "@/common/state/features/products/product.slice";
import { useAssetStore } from "@/common/state/features/assets/asset.slice";
import { IProductRecord } from "@/common/interfaces";
import ProductPreviewSection from "@/pages/admin/products/sections/Product.preview.section";
import Loader from "@/components/loaders/Loader";
import useLocalStorage from "@/hooks/use-localstorage";

const ProductsPage: FC = () => {
  const { storedValue, setStoredValue } = useLocalStorage<IProductRecord[]>("products", []);
  const { product_list } = useProductStore();
  const { asset_list } = useAssetStore();
  const { setCheckoutCount } = useCheckoutStore();
  const { id } = useParams();

  const addToCartHandler = (item: IProductRecord) => {
    setStoredValue((prev) => [...prev, item]);
  };

  useEffect(() => {
    setCheckoutCount(storedValue.length);
  }, [storedValue]);

  useEffect(() => {
    if (id && id !== "") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [id]);

  if (product_list.length > 0 && asset_list.length > 0) {
    return (
      <section className="relative py-8 lg:py-24" id="shop-products">
        <div className="container relative z-10">
          {product_list.map((item: IProductRecord, idx: number) => (
            <ProductPreviewSection
              onAddCart={addToCartHandler}
              isAdmin={false}
              key={idx}
              selectedProduct={item}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-8 lg:py-24" id="shop-products">
      <div className="container relative z-10">
        <Loader display={true} text="loading products" />
      </div>
    </section>
  );
};

export default ProductsPage;
