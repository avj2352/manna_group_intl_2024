import type { JSX } from "react";
import { FC, Fragment, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-daisyui";
import { Wallet } from 'lucide-react';
import { useNavigate } from "react-router-dom";
// ..custom
import { IProductRecord } from "@/common/interfaces";
import useLocalStorage from "@/hooks/use-localstorage";
import { ShoppingCardEmpty, ShoppingCardItem } from "@/components/cards/ShoppingCard";
import { ICartInventory } from "@/common/interfaces/index";
import { useCheckoutStore } from "@/common/state/features/checkout/checkout.slice";
import { useAuthStore } from "@/common/state/features/auth/auth.slice";
import AuthChoiceDialog from "@/components/dialogs/AuthChoice.dialog";

const ShoppingCartPage: FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const { isGuest, setIsGuest } = useAuthStore();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const { storedValue, setStoredValue } = useLocalStorage<IProductRecord[]>("products", []);
  const { cart_items, setCartItems, setCheckoutCount } = useCheckoutStore();

 const handleCheckout = () => {
  setIsGuest(true);
  navigate("/shipping-address");
};

  const handleItemQtityChanged = (it: ICartInventory) => {
    const temp = cart_items.map((i: ICartInventory) => {
      if (i.item.product_id === it.item.product_id) {
        return { item: i.item, count: it.count };
      }
      return i;
    });
    setCartItems(temp);
  };

  const handleDeleteCartItem = (it: ICartInventory) => {
    const temp = cart_items.filter(
      (i: ICartInventory) => i.item.product_id !== it.item.product_id
    );
    setCartItems(temp);
    const newFlatItems = temp.flatMap((i: ICartInventory) =>
      Array(i.count).fill(i.item)
    );
    setStoredValue(newFlatItems);
    setCheckoutCount(newFlatItems.length);
  };

  const populateCartInventory = (
    acc: ICartInventory[],
    item: IProductRecord
  ): ICartInventory[] => {
    const existing = acc.find((i) => i.item.product_id === item.product_id);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ item, count: 1 });
    }
    return acc;
  };

  // Sync cart_items from localStorage whenever storedValue changes
  useEffect(() => {
    const grouped = storedValue.reduce(populateCartInventory, []);
    setCartItems(grouped);
    setCheckoutCount(storedValue.length);
  }, [storedValue]);

  const totalPrice: number = cart_items.reduce((acc: number, item: ICartInventory) => {
    return acc + item.item.price * item.count;
  }, 0);

  let content: JSX.Element = <Fragment />;

  if (cart_items.length === 0) {
    content = (
      <section className="text-xl font-bold border-b border-dashed">
        <ShoppingCardEmpty />
      </section>
    );
  } else {
    content = (
      <Fragment>
        <section className="text-xl font-bold border-b border-dashed">
          {cart_items.map((item: ICartInventory, idx: number) => (
            <ShoppingCardItem
              key={idx + 1}
              item={item}
              onChangeQuantity={handleItemQtityChanged}
              onDeleteItem={handleDeleteCartItem}
            />
          ))}
        </section>
        <section className="flex flex-col items-center justify-center m-4 w-100">
          <p className="self-end text-2xl">
            Total <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </p>
          <Button onClick={handleCheckout} color="primary">
            <Wallet /> Checkout
          </Button>
        </section>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <AuthChoiceDialog
        open={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
        redirectToCheckout
      />

      <div className="relative py-8 lg:py-24" id="shop-cart">
        <div className="container relative z-10">
          <h1 className="mt-16 font-bold leading-10 tracking-tight text-center lg:mt-4 text-brand-gradient text-3xl/tight sm:text-start">
            Cart items
          </h1>
          {content}
        </div>
      </div>
    </Fragment>
  );
};

export default ShoppingCartPage;
