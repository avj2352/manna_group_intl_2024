import "@/styles/manna-checkout.css";

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
import GuestOrderAPIClient from "@/common/state/services/orders/guest-order.api";
import useLocalStorage from "@/hooks/use-localstorage";
import { IProductRecord } from "@/common/interfaces";

const PRODUCT_IMAGES: Record<string, string> = {
  calcunix:
    "https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_53_18-PM.png",

  menoseg:
    "https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_57_01-PM.png",

  prosanteplus:
    "https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_56_13-PM.png",

  manaliv:
    "https://hunnydeescloset.com/wp-content/uploads/2023/10/ChatGPT-Image-Jun-6-2026-12_59_21-PM.png",
};

const normalizeValue = (value: unknown): string => {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
};

const stripePromise = loadStripe(VITE_STRIPE_KEY);

// Zod schema for the shipping address form
const shippingSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().optional(),
  street: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(3, "ZIP / postal code is required"),
  country: z.string().min(2, "Country is required"),
  contact: z.string().min(6, "Phone number is required"),
  promo_code: z.string().optional(),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

const guestShippingSchema = shippingSchema.extend({
  email: z.string().email("Valid email is required"),
});

// ── Inner form component (must be inside <Elements>) ──────────────────────────
const CheckoutForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const { cart_items, resetCartItems, setCartItems, setCheckoutCount } = useCheckoutStore();
  const { token, user, isGuest } = useAuthStore();
  const { storedValue, setStoredValue } = useLocalStorage<IProductRecord[]>("products", []);

  // Hydrate cart from localStorage on direct navigation / page refresh
  useEffect(() => {
    if (cart_items.length === 0 && storedValue.length > 0) {
      const grouped = storedValue.reduce(
        (acc: { item: IProductRecord; count: number }[], item: IProductRecord) => {
          const existing = acc.find((i) => i.item.product_id === item.product_id);
          if (existing) { existing.count += 1; } else { acc.push({ item, count: 1 }); }
          return acc;
        },
        []
      );
      setCartItems(grouped);
      setCheckoutCount(storedValue.length);
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [processingFee, setProcessingFee] = useState<number | null>(null);
  const [grandTotal, setGrandTotal] = useState<number | null>(null);

  const { user: auth0User } = useAuth0();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(isGuest ? guestShippingSchema : shippingSchema),
    defaultValues: { country: "US" },
  });

  // Prefill name from Auth0 profile only for authenticated (non-guest) users
  useEffect(() => {
    if (!isGuest && auth0User?.name) {
      resetForm((prev) => ({ ...prev, name: auth0User.name ?? "" }));
    }
  }, [auth0User?.name, isGuest]);

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

  // Derive login_type from Auth0 sub (e.g. "google-oauth2|..." → "google")
  const deriveLoginType = (): string => {
    if (isGuest) return "guest";
    const sub = auth0User?.sub ?? "";
    if (sub.startsWith("google-oauth2")) return "google";
    if (sub.startsWith("github")) return "github";
    if (sub.startsWith("facebook")) return "facebook";
    if (sub.startsWith("twitter")) return "twitter";
    if (sub.startsWith("windowslive")) return "microsoft";
    if (sub.startsWith("linkedin")) return "linkedin";
    if (sub.startsWith("auth0")) return "auth0";
    return "sso";
  };

  const onSubmit = async (formValues: ShippingFormValues) => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setIsSubmitting(true);
    setCardError(null);

    const loginType = deriveLoginType();

    try {
      // Use guest client (no auth header) or authenticated client
      const client = isGuest
        ? new GuestOrderAPIClient(VITE_ORDERS_API_URL)
        : new OrderAPIClient(token, VITE_ORDERS_API_URL);

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
              email: isGuest ? formValues.email : user?.email,
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
        login_type: loginType,
        items: orderItems,
        shipping_address: {
          street: formValues.street,
          city: formValues.city,
          state: formValues.state,
          zip: formValues.zip,
          country: formValues.country,
          contact: formValues.contact,
          email: isGuest ? formValues.email : (user?.email ?? ""),
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
        {isGuest && (
          <div className="rounded-lg bg-base-200 px-4 py-2 text-sm text-base-content/70">
            Checking out as <span className="font-semibold">Guest</span> — your order won't appear in "My Orders".
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Full Name</label>
          <input
            {...register("name")}
            placeholder="Jane Doe"
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-xs text-error">{errors.name.message}</p>}
        </div>

        {isGuest && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email Address</label>
            <input
              {...register("email")}
              placeholder="jane@example.com"
              className="input input-bordered w-full"
            />
            {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
          </div>
        )}

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
       {cart_items.map((ci: ICartInventory, idx: number) => {
  const image =
    PRODUCT_IMAGES[
      normalizeValue(ci.item.product_id || ci.item.name)
    ] ||
    PRODUCT_IMAGES[
      normalizeValue(ci.item.name)
    ];

  return (
    <div
      key={idx}
      className="summary-product"
    >
      <img
        src={image}
        alt={ci.item.name}
      />

      <div className="summary-product-info">
        <h4>{ci.item.name}</h4>

        <p>
          Qty: {ci.count}
        </p>
      </div>

      <strong>
        ${(Number(ci.item.price) * ci.count).toFixed(2)}
      </strong>
    </div>
  );
})}
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

// ── Page wrapper: loads Stripe; allows authenticated users and guests ─────────
const AddressShippingPage: FC = () => {
  const { isAuthenticated } = useAuth0();
  const { isGuest } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isGuest) {
      navigate("/my-cart", { replace: true });
    }
  }, [isAuthenticated, isGuest]);

  if (!isAuthenticated && !isGuest) return null;

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
