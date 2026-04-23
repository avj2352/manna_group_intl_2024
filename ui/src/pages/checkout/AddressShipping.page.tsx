import { FC, Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "react-daisyui";
import { ShoppingBag, CreditCard, Loader2 } from "lucide-react";
// custom
import { VITE_STRIPE_KEY, VITE_ORDERS_API_URL } from "@/util/envConfig";
import { useCheckoutStore } from "@/common/state/features/checkout/checkout.slice";
import { useAuthStore } from "@/common/state/features/auth/auth.slice";
import { ICartInventory, IOrderItem } from "@/common/interfaces";
import OrderAPIClient from "@/common/state/services/orders/order.api";
import useLocalStorage from "@/hooks/use-localstorage";
import { IProductRecord } from "@/common/interfaces";

const stripePromise = loadStripe(VITE_STRIPE_KEY);

// Zod schema for the shipping address form
const shippingSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  street: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(3, "ZIP / postal code is required"),
  country: z.string().min(2, "Country is required"),
  contact: z.string().min(6, "Phone number is required"),
  promo_code: z.string().optional(),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

// ── Inner form component (must be inside <Elements>) ──────────────────────────
const CheckoutForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { cart_items, resetCartItems } = useCheckoutStore();
  const { token, user } = useAuthStore();
  const { setStoredValue } = useLocalStorage<IProductRecord[]>("products", []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [processingFee, setProcessingFee] = useState<number | null>(null);
  const [grandTotal, setGrandTotal] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { country: "US" },
  });

  // Build order items from cart
  const orderItems: IOrderItem[] = cart_items.map((ci: ICartInventory) => ({
    product_id: ci.item.product_id,
    name: ci.item.name,
    price: Number(ci.item.price),
    quantity: ci.count,
  }));

  const totalPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const onSubmit = async (formValues: ShippingFormValues) => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setIsSubmitting(true);
    setCardError(null);

    try {
      const client = new OrderAPIClient(token, VITE_ORDERS_API_URL);

      // 1. Create PaymentIntent on the server
      const piResponse = await client.createPaymentIntent<{
        client_secret: string;
        payment_intent_id: string;
        amount: number;
        subtotal: number;
        processing_fee: number;
        currency: string;
      }>({
        items: orderItems,
        currency: "usd",
        promo_code: formValues.promo_code || undefined,
      });

      const { client_secret, payment_intent_id, processing_fee, amount } = piResponse.data;
      setProcessingFee(processing_fee / 100);
      setGrandTotal(amount / 100);

      // 2. Confirm card payment via Stripe.js
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formValues.name,
              email: user?.email,
            },
          },
        });

      if (stripeError) {
        navigate("/order-failure", {
          state: {
            error_code: stripeError.code ?? "card_error",
            error_message: stripeError.message ?? "Card payment failed.",
          },
        });
        return;
      }

      if (paymentIntent?.status !== "succeeded") {
        navigate("/order-failure", {
          state: {
            error_code: "payment_incomplete",
            error_message: "Payment was not completed. Please try again.",
          },
        });
        return;
      }

      // 3. Create the order record in the database
      const orderResponse = await client.createOrder<{ message: { order_id: string } }>({
        payment_intent_id,
        name: formValues.name,
        items: orderItems,
        shipping_address: {
          street: formValues.street,
          city: formValues.city,
          state: formValues.state,
          zip: formValues.zip,
          country: formValues.country,
          contact: formValues.contact,
          email: user?.email ?? "",
        },
        promo_code: formValues.promo_code || undefined,
      });

      // 4. Clear the cart only on success
      resetCartItems();
      setStoredValue([]);

      navigate("/order-success", {
        state: {
          order_id: orderResponse.data.message?.order_id ?? payment_intent_id,
          payment_intent_id,
          total_amount: grandTotal ?? totalPrice,
          name: formValues.name,
          items: orderItems,
        },
      });
    } catch (err: any) {
      console.error("Checkout error:", err);
      navigate("/order-failure", {
        state: {
          error_code: "server_error",
          error_message: err?.message ?? "Something went wrong. Please try again.",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart_items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <ShoppingBag className="w-12 h-12 opacity-40" />
        <p className="text-lg opacity-60">Your cart is empty.</p>
        <Button color="primary" onClick={() => navigate("/products/shop")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* ── Left column: Shipping address ── */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Shipping Information</h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Full Name</label>
          <input
            {...register("name")}
            placeholder="Jane Doe"
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Street Address</label>
          <input
            {...register("street")}
            placeholder="123 Main St"
            className="input input-bordered w-full"
          />
          {errors.street && <p className="text-xs text-error">{errors.street.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">City</label>
            <input
              {...register("city")}
              placeholder="New York"
              className="input input-bordered w-full"
            />
            {errors.city && <p className="text-xs text-error">{errors.city.message}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">State / Province</label>
            <input
              {...register("state")}
              placeholder="NY"
              className="input input-bordered w-full"
            />
            {errors.state && <p className="text-xs text-error">{errors.state.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">ZIP / Postal Code</label>
            <input
              {...register("zip")}
              placeholder="10001"
              className="input input-bordered w-full"
            />
            {errors.zip && <p className="text-xs text-error">{errors.zip.message}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Country</label>
            <input
              {...register("country")}
              placeholder="US"
              className="input input-bordered w-full"
            />
            {errors.country && <p className="text-xs text-error">{errors.country.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Phone Number</label>
          <input
            {...register("contact")}
            placeholder="+1 555 000 0000"
            className="input input-bordered w-full"
          />
          {errors.contact && <p className="text-xs text-error">{errors.contact.message}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Promo Code (optional)</label>
          <input
            {...register("promo_code")}
            placeholder="SAVE10"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* ── Right column: Order summary + payment ── */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        <div className="rounded-lg border border-base-300 p-4 flex flex-col gap-2">
          {cart_items.map((ci: ICartInventory, idx: number) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>{ci.item.name} × {ci.count}</span>
              <span>${(Number(ci.item.price) * ci.count).toFixed(2)}</span>
            </div>
          ))}
          <div className="divider my-1" />
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-base-content/60">
            <span>
              Processing fee (3%)
              {processingFee === null && (
                <span className="ml-1 opacity-50 italic text-xs">— calculated at payment</span>
              )}
            </span>
            <span>{processingFee !== null ? `$${processingFee.toFixed(2)}` : "—"}</span>
          </div>
          <div className="divider my-1" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{grandTotal !== null ? `$${grandTotal.toFixed(2)}` : `$${(totalPrice * 1.03).toFixed(2)}`}</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-2">Payment</h2>

        <div className="rounded-lg border border-base-300 p-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>

        {cardError && (
          <p className="text-sm text-error">{cardError}</p>
        )}

        <Button
          type="submit"
          color="primary"
          disabled={!stripe || isSubmitting}
          className="w-full mt-2"
        >
          {isSubmitting ? (
            <Fragment>
              <Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing…
            </Fragment>
          ) : (
            <Fragment>
              <CreditCard className="w-4 h-4 mr-2" /> Pay ${grandTotal !== null ? grandTotal.toFixed(2) : (totalPrice * 1.03).toFixed(2)}
            </Fragment>
          )}
        </Button>
      </div>
    </form>
  );
};

// ── Page wrapper: loads Stripe and gates on auth ──────────────────────────────
const AddressShippingPage: FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return (
    <div className="relative py-8 lg:py-16" id="checkout-page">
      <div className="container relative z-10">
        <h1 className="mt-16 mb-8 font-bold leading-10 tracking-tight text-center lg:mt-4 text-brand-gradient text-3xl/tight sm:text-start">
          Checkout
        </h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default AddressShippingPage;
