// Component to define columns
import { Fragment, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IProductRecord } from "@/common/interfaces";
import { ArrowUpDown, Eye, Trash } from "lucide-react";
import CommonAppDialog from "@/components/dialogs/CommonApp.dialog";
import { useProductStore } from "@/common/state/features/products/product.slice";
import { useAuthStore } from "@/common/state/features/auth/auth.slice";
import { addDecimalIfNotPresent } from "@/util/helper";

// This type is used to define the shape of our data.
export const columns: ColumnDef<IProductRecord>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Description
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Content
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const record: IProductRecord = row.original;
      return (
        <p>
          {record.content.length > 100 ? record.content.slice(0, 100) + "..." : record.content}
        </p>
      );
    }
  },

  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const record: IProductRecord = row.original;      
      return (
        <p>
          {addDecimalIfNotPresent(record.price)}
        </p>
      );
    }
  },
  {
    accessorKey: "currency",
    header: "Currency",
    cell: ({ row }) => {
      const record: IProductRecord = row.original;
      return (
        <p className="text-base">
          {String(record.currency).toUpperCase()}
        </p>
      );
    }
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  // actions
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const record: IProductRecord = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const { token } = useAuthStore();
      const { fetchProductDeleteAPI, setSelectedProduct } = useProductStore();


      return (
        <Fragment>
          <CommonAppDialog
            title="Delete Product ?"
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}>
            <section className="flex flex-col">
              <p className="text-base">
                Are you sure you want to delete the product ? This action cannot be undone
              </p>
              <Button
                onClick={() => fetchProductDeleteAPI({
                  id: record.product_id,
                  token
                })}
                className="mt-4">Confirm Delete</Button>
            </section>
          </CommonAppDialog>
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
                className="cursor-pointer"
                onClick={() => setSelectedProduct(record)}>
                <Eye className="w-4 h-4 mr-2" />
                View Product
              </DropdownMenuItem>              
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsDialogOpen(true)}>
                <Trash className="w-4 h-4 mr-2" />
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Fragment>
      );
    },
  },
];
