import { FC, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/common/state/store";
import { ICheckoutState } from "@/common/state/features/checkout/checkout.slice";

type IShoppingCartBadgeProps = {
  onBadgeClick: () => void
};



const ShoppingCartBadge: FC<IShoppingCartBadgeProps> = ({ onBadgeClick }) => {
  const checkoutState: ICheckoutState = useAppSelector(state => state.checkout);
  
  return (
    <Avatar
      className="overflow-auto relative"
      onClick={onBadgeClick}>
      <div className="absolute right-4 top-4">
        <ShoppingCart className="w-4 h-4"/>
        {checkoutState.checkout_items > 0 && (
          <span className="absolute -top-4 -right-2 bg-red-500 text-white text-xs font-bold rounded-full
             h-5 w-5 flex items-center justify-center">
            {checkoutState.checkout_items}
          </span>
        )}
      </div>
    </Avatar>
  );
};

export default ShoppingCartBadge;
