import { FC, useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { Wallet } from 'lucide-react';
// ..custom
import { IProductRecord } from "@/common/interfaces";
import useLocalStorage from "@/hooks/use-localstorage";
import Loader from "@/components/loaders/Loader";
import {ShoppingCardEmpty, ShoppingCardItem} from "@/components/cards/ShoppingCard";

type ICartInventory = {
  item: IProductRecord,
  count: number
};

const ShoppingCartPage: FC = () => {
  const { storedValue } = useLocalStorage<IProductRecord[]>("products", []);
  const [cartMap, setCartMap] = useState<ICartInventory[]>([]);
  
  console.log("ShoppingCartPage: Shopping cart items: ", storedValue);

  const populateCartInventory = (acc: ICartInventory[], item: IProductRecord): ICartInventory[] => {
    if (acc.some((i: ICartInventory) => i.item.product_id === item.product_id)) {
      acc.map((x: ICartInventory) => x.count += 1);
    } else {
      acc.push({item: item, count: 1});  
    }
    return acc;
  };

  useEffect(()=>{
    if (storedValue.length === 0) return;
    console.log('Creating unique items: ');
    setCartMap(storedValue.reduce(populateCartInventory, []));    
  },[storedValue]);

  console.log('Shopping cart unique items is: ', cartMap);

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
