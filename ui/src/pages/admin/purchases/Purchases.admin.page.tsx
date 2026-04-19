import { FC, useEffect, useState } from "react";
// custom
import { columns } from "./purchase-data-table-columns";
import { PurchaseDataTable } from "./purchase-data-table";
import { useAuthStore } from "@/common/state/features/auth/auth.slice";
import { IOrderRecord } from "@/common/interfaces";
import OrderAPIClient from "@/common/state/services/orders/order.api";
import { VITE_ORDERS_API_URL } from "@/util/envConfig";

const PurchaseAdminPage: FC = () => {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState<IOrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const client = new OrderAPIClient(token, VITE_ORDERS_API_URL);
    client
      .getAllOrders<{ message: IOrderRecord[] }>()
      .then((res) => setOrders(res.data.message ?? []))
      .catch(() => setError("Failed to load orders"))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <section className="relative py-8 lg:py-24" id="purchases-admin-page">
      <div className="container relative z-10">
        <div className="flex flex-col text-base flex-start">
          <h3 className="mb-4 text-2xl">Product Purchase History</h3>
          {loading && <p className="opacity-60">Loading orders…</p>}
          {error && <p className="text-error">{error}</p>}
          {!loading && !error && (
            <PurchaseDataTable columns={columns} data={orders} />
          )}
        </div>
      </div>
    </section>
  );
};

export default PurchaseAdminPage;
