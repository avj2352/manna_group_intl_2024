import { FC, Fragment, useEffect } from "react";
import { Hero } from "@/pages/home/sections/Hero";
import { Feature } from "@/pages/home/sections/Feature";
import QuickContacts from "@/pages/home/sections/QuickContacts";
import { Works } from "@/pages/home/sections/Works";
import Keypoints from "@/pages/home/sections/Keypoints";
import ProductCarousel from "@/components/carousels/ProductCarousel";
import { useProductStore } from "@/common/state/features/products/product.slice";
import { useAssetStore } from "@/common/state/features/assets/asset.slice";

const HomePage: FC = () => {
  const { fetchProductListAPI } = useProductStore();
  const { fetchAssetListAPI } = useAssetStore();

  useEffect(() => {
    fetchProductListAPI();
    fetchAssetListAPI();
  }, []);

  return (
    <Fragment>
      <Hero />
      <ProductCarousel />
      <section className="py-12 lg:py-16" id="keypoints">
        <div className="container">
          <Keypoints />
        </div>
      </section>
      <Feature />
      <Works />
      <QuickContacts />
    </Fragment>
  );
};

export default HomePage;
