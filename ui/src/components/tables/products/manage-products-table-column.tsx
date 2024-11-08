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
import { ArrowUpDown, Pencil, Eye, Trash } from "lucide-react";
import CommonAppDialog from "@/components/dialogs/CommonApp.dialog";
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { fetchProductDeleteAPI, fetchProductDetailsByIdAPI } from "@/common/state/features/products/product.slice";

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
          #
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
          Asset Key
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "assets",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asset Type
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
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
    header: "Quantity",
  },
  // actions
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const record: IProductRecord = row.original;
      const [isDisalogOpen, setIsDialogOpen] = useState(false);
      const dispatch = useAppDispatch();
      const authState = useAppSelector((state) => state.auth);


      return (
        <Fragment>
          <CommonAppDialog
              title="Delete Product ?"
              open={isDisalogOpen}
              onClose={() => setIsDialogOpen(false)}>
                <section className="flex flex-col">
                  <p className="text-base">
                    Are you sure you want to delete the product ? This action cannot be undone
                  </p>
                  <Button
                    onClick={() => dispatch(fetchProductDeleteAPI({
                      id: record.product_id,
                      token: authState.token
                    }))} 
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
              onClick={() => dispatch(fetchProductDetailsByIdAPI({
                id: record.product_id                
              }))}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Product
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                console.log('Navigate product id: ', record.product_id);
                window.location.href = `#/admin/products/edit/${record.product_id}`;
              }}>
              <Pencil className="w-4 h-4 mr-2" />
              Update Product
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
