import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
// ..images
import { setCheckoutCount } from "@/common/state/features/checkout/checkout.slice";
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { IProductRecord } from "@/common/interfaces";
import ProductPreviewSection from "@/pages/admin/products/sections/Product.preview.section";
import Loader from "@/components/loaders/Loader";
import useLocalStorage from "@/hooks/use-localstorage";

const ProductsPage: FC = () => {
  const { storedValue, setStoredValue } = useLocalStorage<IProductRecord[]>('products', []);
  const productState = useAppSelector((state) => state.products);
  const assetState = useAppSelector((state) => state.asset);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  // evt handlers
  const addToCartHandler = (item: IProductRecord) => {
    console.log('item to add to cart: ', item);
    setStoredValue(prev => [...prev, item]);
  };

  useEffect(()=>{
    // console.log('Products: Stored item is: ', storedValue);
    dispatch(setCheckoutCount(storedValue.length));
  },[ storedValue ]);
  
  useEffect(() => {
    if (Boolean(id) && id !== "") {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }, [id]);


  if (
    Boolean(productState.product_list) && 
    productState.product_list.length > 0 &&
    Boolean(assetState.asset_list) &&
    assetState.asset_list.length > 0
  ) {
    return (<section className="relative py-8 lg:py-24" id="shop-products">
      <div className="container relative z-10">
        {productState.product_list.map((item: IProductRecord, idx: number) => (
          <ProductPreviewSection
            onAddCart={addToCartHandler}
            isAdmin={false}
            key={idx}
            selectedProduct={item}
          />
        ))}
      </div>
    </section>);
  } else if (productState.product_list.length === 0 || assetState.asset_list.length === 0) {
    return (<section className="relative py-8 lg:py-24" id="shop-products">
      <div className="container relative z-10">
        <Loader display={true} text="loading products" />
      </div>
    </section>);      
  } else {
    return (<section className="relative py-8 lg:py-24" id="shop-products">
      <div className="container relative z-10">
        <Loader display={true} text="loading products" />
      </div>
    </section>);
  }
};

export default ProductsPage;


{/* Promo Video section*/ }
{/* <div className="grid items-center gap-12 mt-16 lg:grid-cols-2 xl:gap-36">
          <div className="order-2 lg:order-1">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/S_ryB8MyyzI?si=1MEyv4qJJ2AvXCES&rel=0"
              title="MANNA promotional video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              className="rounded-xl"
              allowFullScreen
            ></iframe>
          </div>
          <div className="order-1 lg:order-2">
            <h1 className="font-bold leading-10 tracking-tight text-center text-3xl/tight sm:text-start lg:text-4xl/tight">
              <span className="text-brand-gradient">MANNA</span> Our Products
            </h1>
            <p className="mt-8 text-base text-center sm:text-start">
              Watch our promotional video for the overview of all products
            </p>
          </div>
</div> */}
