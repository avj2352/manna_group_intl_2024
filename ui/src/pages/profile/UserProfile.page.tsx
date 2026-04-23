import { FC, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Package, CalendarDays, DollarSign, BadgeCheck, Clock, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// custom
import { useAuthStore } from "@/common/state/features/auth/auth.slice";
import { IOrderRecord } from "@/common/interfaces";
import OrderAPIClient from "@/common/state/services/orders/order.api";
import { VITE_ORDERS_API_URL } from "@/util/envConfig";

const statusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return <BadgeCheck className="w-4 h-4 text-success" />;
    case "pending":
    case "processing":
      return <Clock className="w-4 h-4 text-warning" />;
    default:
      return <XCircle className="w-4 h-4 text-error" />;
  }
};

const statusBadge = (status: string) => {
  const base = "badge badge-sm capitalize";
  switch (status.toLowerCase()) {
    case "confirmed":
      return `${base} badge-success`;
    case "pending":
      return `${base} badge-warning`;
    case "processing":
      return `${base} badge-info`;
    default:
      return `${base} badge-error`;
  }
};

const UserProfilePage: FC = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<IOrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }
    if (!token) return;

    const client = new OrderAPIClient(token, VITE_ORDERS_API_URL);
    client
      .getMyOrders<{ message: IOrderRecord[] }>()
      .then((res) => setOrders(res.data.message ?? []))
      .catch(() => setError("Failed to load your orders. Please try again."))
      .finally(() => setLoading(false));
  }, [isAuthenticated, token]);

  if (!isAuthenticated) return null;

  return (
    <div className="relative py-8 lg:py-16" id="user-profile-page">
      <div className="container relative z-10">
        <h1 className="mt-16 mb-8 font-bold leading-10 tracking-tight text-center lg:mt-4 text-brand-gradient text-3xl/tight sm:text-start">
          My Profile
        </h1>

        {/* User info card */}
        <div className="flex items-center gap-4 rounded-xl border border-base-300 bg-base-200 p-6 mb-8 max-w-md">
          <Avatar className="w-14 h-14">
            <AvatarImage src={user?.picture} />
            <AvatarFallback className="text-lg">
              {user?.name?.substring(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-lg">{user?.name}</p>
            <p className="text-sm opacity-60">{user?.email}</p>
          </div>
        </div>

        {/* Order history */}
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" /> Order History
        </h2>

        {loading && (
          <div className="flex items-center gap-2 opacity-60">
            <span className="loading loading-spinner loading-sm" />
            <span>Loading orders…</span>
          </div>
        )}

        {error && (
          <div className="alert alert-error max-w-lg">
            <XCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-12 text-center opacity-60">
            <Package className="w-12 h-12" />
            <p className="text-lg">No orders yet.</p>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/products/shop")}
            >
              Start Shopping
            </button>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="flex flex-col gap-4">
            {orders.map((order) => {
              const isExpanded = expandedOrder === order.order_id;
              return (
                <div
                  key={order.order_id}
                  className="rounded-xl border border-base-300 bg-base-100 p-5 flex flex-col gap-3"
                >
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {statusIcon(order.order_status)}
                        <span className="font-semibold text-sm font-mono">{order.order_id}</span>
                        <span className={statusBadge(order.order_status)}>{order.order_status}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm opacity-60">
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {new Date(order.order_date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5" />{(order.total_amount / 100).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs opacity-40 font-mono">Payment: {order.stripe_invoice}</p>
                    </div>

                    {order.items && order.items.length > 0 && (
                      <button
                        className="btn btn-ghost btn-xs flex items-center gap-1 self-start sm:self-center"
                        onClick={() => setExpandedOrder(isExpanded ? null : order.order_id)}
                      >
                        {isExpanded ? (
                          <><ChevronUp className="w-3.5 h-3.5" /> Hide items</>
                        ) : (
                          <><ChevronDown className="w-3.5 h-3.5" /> View items ({order.items.length})</>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Expandable items */}
                  {isExpanded && order.items && order.items.length > 0 && (
                    <div className="border-t border-base-300 pt-3 flex flex-col gap-1">
                      <div className="grid grid-cols-3 text-xs font-semibold opacity-50 mb-1">
                        <span>Item</span>
                        <span className="text-center">Qty</span>
                        <span className="text-right">Price</span>
                      </div>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-3 text-sm">
                          <span>{item.name}</span>
                          <span className="text-center opacity-60">× {item.quantity}</span>
                          <span className="text-right">${(item.price_cents / 100 * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
