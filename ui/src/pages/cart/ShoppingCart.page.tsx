import { FC } from "react";
import { Button } from "react-daisyui";
import { Wallet } from 'lucide-react';
// ..custom
import { IProductRecord } from "@/common/interfaces";
import useLocalStorage from "@/hooks/use-localstorage";
import Loader from "@/components/loaders/Loader";
import {ShoppingCardEmpty, ShoppingCardItem} from "@/components/cards/ShoppingCard";

const ShoppingCartPage: FC = () => {
  const { storedValue } = useLocalStorage<IProductRecord[]>("products", []);

  console.log("ShoppingCartPage: Shopping cart items: ", storedValue);

  return (
    <div className="relative py-8 lg:py-24" id="shop-cart">
      <div className="container relative z-10">
        <h1 className="mt-16 font-bold leading-10 tracking-tight text-center lg:mt-4 text-brand-gradient text-3xl/tight sm:text-start">          
          Cart items
        </h1>
        <section className="text-xl font-bold border-b border-dashed">
        <Loader display={true} text="loading cart"/>      
        <ShoppingCardEmpty />
        <ShoppingCardItem />
        </section>
        <section className="flex flex-col items-center justify-center m-4 w-100">
            <p className="self-end text-2xl">
              Total <span className="font-bold">$100</span>
            </p>
            <Button color="primary">
              <Wallet/> Checkout
            </Button>
        </section>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
