import type { JSX } from "react";
import { FC, Fragment, useEffect } from "react";
import { Button } from "react-daisyui";
import { Wallet } from 'lucide-react';
// ..custom
import { IProductRecord } from "@/common/interfaces";
import useLocalStorage from "@/hooks/use-localstorage";
import {ShoppingCardEmpty, ShoppingCardItem} from "@/components/cards/ShoppingCard";
import { ICartInventory } from "@/common/interfaces/index";
import { useAppSelector, useAppDispatch } from "@/common/state/store";
import { ICheckoutState, setCartItems } from "@/common/state/features/checkout/checkout.slice";

const ShoppingCartPage: FC = () => {
  const { storedValue, setStoredValue } = useLocalStorage<IProductRecord[]>("products", []);
  const cartState: ICheckoutState = useAppSelector(store => store.checkout);
  const { cart_items } = cartState;
  const dispatch = useAppDispatch();
  
  // console.log("ShoppingCartPage: Shopping cart items: ", storedValue);

  //..evt handlers
  const handleItemQtityChanged = (it: ICartInventory) => {
    console.log('Item quantity changed: ', it);
    const temp = cart_items.map((i: ICartInventory) => {
        if (i.item.product_id === it.item.product_id) {
          const record = { item: i.item, count: it.count};
          i = record;
        } 
        return i;
    });
    console.log('New items with qtity: ', temp);
    dispatch(setCartItems(temp));
  };

  
  const handleDeleteCartItem = (it: ICartInventory) => {
    const temp = cart_items.filter((i: ICartInventory) => i.item.product_id !== it.item.product_id);
    dispatch(setCartItems(temp));
    // update count with new filtered items
    const newFlatItems = temp.flatMap((it: ICartInventory) => it.item);
    setStoredValue(newFlatItems);
  };

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
    dispatch(setCartItems(storedValue.reduce(populateCartInventory, [])));    
  },[]);


  // get total price
  console.log('Cart items: ', cart_items);
  const totalPrice: number = cart_items.reduce((acc: number, item: ICartInventory) => {
    acc += item.item.price * item.count;
    return acc;
  }, 0);

  // dynamic content
  let content: JSX.Element = <Fragment/>;

  if (cart_items.length === 0) {
    content = (
      <section className="text-xl font-bold border-b border-dashed">
          <ShoppingCardEmpty />
      </section>
    );
  } else {
    content = (<Fragment>
    <section className="text-xl font-bold border-b border-dashed">
          {cart_items.map((item: ICartInventory, idx: number) => <ShoppingCardItem
            key={idx+1}
            item={item}
            onChangeQuantity={handleItemQtityChanged}
            onDeleteItem={handleDeleteCartItem}
            />)}
        </section>
        <section className="flex flex-col items-center justify-center m-4 w-100">
            <p className="self-end text-2xl">
              Total <span className="font-bold">${totalPrice}</span>
            </p>
            <Button color="primary">
              <Wallet/> Checkout
            </Button>
        </section>
    </Fragment>);
  }

  return (
    <div className="relative py-8 lg:py-24" id="shop-cart">
      <div className="container relative z-10">
        <h1 className="mt-16 font-bold leading-10 tracking-tight text-center lg:mt-4 text-brand-gradient text-3xl/tight sm:text-start">          
          Cart items
        </h1>
        {content}
        </div>
    </div>
  );
};

export default ShoppingCartPage;
