import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { XCircle, RefreshCw, ShoppingBag } from "lucide-react";
import { Button } from "react-daisyui";

export type IOrderFailureState = {
  error_code?: string;
  error_message?: string;
};

const OrderFailurePage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as IOrderFailureState | null;

  return (
    <div className="relative py-8 lg:py-16" id="order-failure-page">
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <XCircle className="w-20 h-20 text-error" />

        <h1 className="text-3xl font-bold tracking-tight text-error">
          Payment Failed
        </h1>

        <p className="text-lg opacity-70 max-w-md">
          Unfortunately your payment could not be processed. Your cart has been kept intact —
          please review your details and try again.
        </p>

        {state && (state.error_code || state.error_message) && (
          <div className="rounded-xl border border-error/30 bg-error/5 p-6 w-full max-w-md flex flex-col gap-3 text-left">
            {state.error_code && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium opacity-60">Error Code</span>
                <span className="text-sm font-mono font-semibold text-error">{state.error_code}</span>
              </div>
            )}
            {state.error_code && state.error_message && <div className="divider my-0" />}
            {state.error_message && (
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium opacity-60">Details</span>
                <span className="text-sm">{state.error_message}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button color="primary" onClick={() => navigate("/shipping-address")}>
            <RefreshCw className="w-4 h-4 mr-2" /> Try Again
          </Button>
          <Button color="ghost" onClick={() => navigate("/my-cart")}>
            <ShoppingBag className="w-4 h-4 mr-2" /> Back to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderFailurePage;
