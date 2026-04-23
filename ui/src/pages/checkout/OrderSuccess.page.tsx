import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, ShoppingBag, Package } from "lucide-react";
import { Button } from "react-daisyui";
import { IOrderItem } from "@/common/interfaces";

export type IOrderSuccessState = {
  order_id: string;
  payment_intent_id: string;
  total_amount: number;
  name: string;
  items: IOrderItem[];
};

const OrderSuccessPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as IOrderSuccessState | null;

  return (
    <div className="relative py-8 lg:py-16" id="order-success-page">
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <CheckCircle className="w-20 h-20 text-success" />

        <h1 className="text-3xl font-bold tracking-tight text-success">
          Order Confirmed!
        </h1>

        <p className="text-lg opacity-70 max-w-md">
          Thank you for your purchase, {state?.name ?? "valued customer"}. Your order has been placed
          successfully and will be processed shortly.
        </p>

        {state && (
          <div className="rounded-xl border border-base-300 bg-base-200 p-6 w-full max-w-lg flex flex-col gap-3 text-left">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium opacity-60 flex items-center gap-2">
                <Package className="w-4 h-4" /> Order ID
              </span>
              <span className="text-sm font-mono font-semibold">{state.order_id}</span>
            </div>
            <div className="divider my-0" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium opacity-60">Payment ID</span>
              <span className="text-sm font-mono">{state.payment_intent_id}</span>
            </div>

            {state.items && state.items.length > 0 && (
              <>
                <div className="divider my-0" />
                <p className="text-sm font-medium opacity-60">Items Ordered</p>
                <div className="flex flex-col gap-1">
                  {state.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.name} <span className="opacity-50">× {item.quantity}</span></span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="divider my-0" />
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium opacity-60">Total Charged</span>
              <span className="text-sm font-bold">${state.total_amount.toFixed(2)}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button color="primary" onClick={() => navigate("/my-profile")}>
            <Package className="w-4 h-4 mr-2" /> View My Orders
          </Button>
          <Button color="ghost" onClick={() => navigate("/products/shop")}>
            <ShoppingBag className="w-4 h-4 mr-2" /> Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
