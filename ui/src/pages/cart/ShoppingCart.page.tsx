import { FC } from "react";
// ..custom
import { IProductRecord } from "@/common/interfaces";
import useLocalStorage from "@/hooks/use-localstorage";



const ShoppingCartPage: FC = () => {
  const { storedValue } = useLocalStorage<IProductRecord[]>('products', []);
  
  console.log('ShoppingCartPage: Shopping cart items: ', storedValue);
  
  return (<section className="relative py-8 lg:py-24" id="shop-products">
      <div className="container relative z-10">
      </div>
    </section>);

};


export default ShoppingCartPage;
