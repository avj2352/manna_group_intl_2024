import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IOrderRecord } from "@/common/interfaces";

const statusColor: Record<string, string> = {
  confirmed: "badge-success",
  pending: "badge-warning",
  failed: "badge-error",
  processing: "badge-info",
};

export const columns: ColumnDef<IOrderRecord>[] = [
  {
    accessorKey: "order_date",
    header: "Date",
    cell: ({ row }) => {
      const raw: string = row.getValue("order_date");
      const d = new Date(raw);
      return isNaN(d.getTime())
        ? raw
        : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    },
  },
  {
    accessorKey: "name",
    header: "Customer",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "order_status",
    header: "Status",
    cell: ({ row }) => {
      const s: string = row.getValue("order_status");
      return (
        <span className={`badge ${statusColor[s] ?? "badge-ghost"} capitalize`}>
          {s}
        </span>
      );
    },
  },
  {
    accessorKey: "total_amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const cents: number = row.getValue("total_amount");
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(cents / 100);
      return <div className="font-medium text-right">{formatted}</div>;
    },
  },
  {
    id: "items",
    header: "Items",
    cell: ({ row }) => {
      const order = row.original;
      const items = order.items ?? [];
      if (items.length === 0) return <span className="text-xs opacity-40">—</span>;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="text-xs h-7">
              View ({items.length})
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md" style={{ color: "#000" }}>
            <DialogHeader>
              <DialogTitle style={{ color: "#000" }}>Order Items</DialogTitle>
            </DialogHeader>
            <div className="text-xs mb-2 font-mono break-all" style={{ color: "#555" }}>
              {order.order_id}
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-4 text-xs font-semibold border-b pb-1" style={{ color: "#000" }}>
                <span className="col-span-2">Item</span>
                <span className="text-center">Qty</span>
                <span className="text-right">Price</span>
              </div>
              {items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-4 text-sm items-center" style={{ color: "#000" }}>
                  <span className="col-span-2">{item.name}</span>
                  <span className="text-center">× {item.quantity}</span>
                  <span className="text-right">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                      (item.price_cents / 100) * item.quantity
                    )}
                  </span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between text-sm font-semibold" style={{ color: "#000" }}>
                <span>Total</span>
                <span>
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                    order.total_amount / 100
                  )}
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.order_id)}
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.stripe_invoice)}
            >
              Copy Stripe Invoice ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
