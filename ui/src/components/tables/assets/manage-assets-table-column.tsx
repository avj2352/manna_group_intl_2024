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
import { IAssetRecord } from "@/common/interfaces";
import { ArrowUpDown, Pencil, Eye, Trash } from "lucide-react";
import CommonAppDialog from "@/components/dialogs/CommonApp.dialog";
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { fetchAssetDeleteAPI, fetchAssetDetailsByIdAPI } from "@/common/state/features/assets/asset.slice";

// This type is used to define the shape of our data.
export const columns: ColumnDef<IAssetRecord>[] = [
  {
    accessorKey: "position",
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
    accessorKey: "asset_key",
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
    accessorKey: "asset_type",
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
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => {
      const item: IAssetRecord = row.original;
      const dispatch = useAppDispatch();
      const authState = useAppSelector((state) => state.auth);
      return (
        <Button
        onClick={() => dispatch(fetchAssetDetailsByIdAPI({
          id: item.asset_id,
          token: authState.token
        }))} 
          variant="ghost">
          <Eye className="w-4 h-4 mr-2" />
        </Button>
      );
    },
  },
  // actions
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const record: IAssetRecord = row.original;
      const [isDisalogOpen, setIsDialogOpen] = useState(false);
      const dispatch = useAppDispatch();
      const authState = useAppSelector((state) => state.auth);


      return (
        <Fragment>
          <CommonAppDialog
              title="Delete Asset ?"
              open={isDisalogOpen}
              onClose={() => setIsDialogOpen(false)}>
                <section className="flex flex-col">
                  <p className="text-base">
                    Are you sure you want to delete the asset ? This action cannot be undone
                  </p>
                  <Button
                    onClick={() => dispatch(fetchAssetDeleteAPI({
                      id: record.asset_id,
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
              onClick={() => dispatch(fetchAssetDetailsByIdAPI({
                id: record.asset_id,
                token: authState.token
              }))}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Asset
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                console.log('Navigate asset id: ', record.asset_id);
                window.location.href = `#/admin/assets/edit/${record.asset_id}`;
              }}>
              <Pencil className="w-4 h-4 mr-2" />
              Update Asset
            </DropdownMenuItem>
            <DropdownMenuSeparator />            
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setIsDialogOpen(true)}>              
                    <Trash className="w-4 h-4 mr-2" />
                    Delete Asset
                </DropdownMenuItem>            
          </DropdownMenuContent>
        </DropdownMenu>
        </Fragment>
      );
    },
  },
];
