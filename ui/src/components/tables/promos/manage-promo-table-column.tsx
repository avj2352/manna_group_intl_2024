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
import { IPromotionRecord } from "@/common/interfaces";
import { ArrowUpDown, Pencil, Eye, Trash } from "lucide-react";
import CommonAppDialog from "@/components/dialogs/CommonApp.dialog";
import { useAppDispatch, useAppSelector } from "@/common/state/store";
import { fetchPromoDeleteAPI } from "@/common/state/features/promotions/promo.slice";

// This type is used to define the shape of our data.
export const columns: ColumnDef<IPromotionRecord>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Promo Code
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const record: IPromotionRecord = row.original;
      return <p>{record.name.toUpperCase()}</p>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "end_date",
    header: "End Date",
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
  },
  // actions
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const record: IPromotionRecord = row.original;
      const [isDisalogOpen, setIsDialogOpen] = useState(false);
      const dispatch = useAppDispatch();
      const authState = useAppSelector((state) => state.auth);

      return (
        <Fragment>
          <CommonAppDialog
            title="Delete Promotion ?"
            open={isDisalogOpen}
            onClose={() => setIsDialogOpen(false)}
          >
            <section className="flex flex-col">
              <p className="text-base">
                Are you sure you want to delete the promotion / offer ? This action cannot
                be undone
              </p>
              <Button
                onClick={() =>
                  dispatch(
                    fetchPromoDeleteAPI({
                      id: record.promotion_id,
                      token: authState.token,
                    })
                  )
                }
                className="mt-4"
              >
                Confirm Delete
              </Button>
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
                onClick={() => {
                  console.log("Navigate promotion id: ", record.promotion_id);
                  window.location.href = `#/admin/promotions/edit/${record.promotion_id}`;
                }}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Update Promotion
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete Promotion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Fragment>
      );
    },
  },
];
