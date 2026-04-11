import { FC } from "react";
import { Avatar } from "@/components/ui/avatar";
import { ShoppingCart } from "lucide-react";
import { useCheckoutStore } from "@/common/state/features/checkout/checkout.slice";

type IShoppingCartBadgeProps = {
  onBadgeClick: () => void;
};

const ShoppingCartBadge: FC<IShoppingCartBadgeProps> = ({ onBadgeClick }) => {
  const { checkout_items } = useCheckoutStore();

  return (
    <Avatar className="overflow-auto relative" onClick={onBadgeClick}>
      <div className="absolute right-4 top-4">
        <ShoppingCart className="w-4 h-4" />
        {checkout_items > 0 && (
          <span className="absolute -top-4 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {checkout_items}
          </span>
        )}
      </div>
    </Avatar>
  );
};

export default ShoppingCartBadge;
