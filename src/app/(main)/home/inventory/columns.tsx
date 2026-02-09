"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogDescription,
} from "@/components/ui/dialog";
import EditProductForm from "../../../../components/custom/EditProductForm";
import DeleteProduct from "@/components/custom/DeleteProduct";
import { ProductFormValues } from "@/lib/schema/product.schema";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

export const columns: ColumnDef<ProductFormValues>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="text-center">
        <Checkbox
          className="text-center"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div
        className="flex justify-center items-center w-full h-full cursor-pointer"
        onClick={() => row.toggleSelected(!row.getIsSelected())} // toggle on cell click
      >
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(val) => row.toggleSelected(!!val)}
          aria-label="Select row"
          onClick={(e) => e.stopPropagation()} // prevent double toggle when clicking checkbox directly
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div>
          <Button variant="ghost" onClick={() => column.toggleSorting()}>
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    // cell: ({ row }) => {
    //   return <div className="text-center font-medium">{row.original.name}</div>;
    // },
  },
  {
    accessorKey: "sku",
    header: () => {
      return (
        <div className="text-center flex flex-nowrap items-center justify-center">
          SKU
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center ">{row.original.sku ?? "n/a"}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} //column.toggleSorting(column.getIsSorted() === "asc")
          >
            PRICE
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return <div className="text-center">${row.original.price}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} //column.toggleSorting(column.getIsSorted() === "asc")
        >
          QUANTITY
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "lowStockThreshold",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} //column.toggleSorting(column.getIsSorted() === "asc")
        >
          LOW STOCK AT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    header: "ACTIONS",
    size: 150, // fixed width
    cell: ({ row }) => {
      // const rowSelections = table.getFilteredSelectedRowModel().rows;
      // const selectedRows = rowSelections.map(({ original }) => original);
      const selected = row.getIsSelected();
      const Row = row.original;
      return (
        <div className="flex items-center justify-center min-w-[150px] space-x-2">
          {selected ? (
            <>
              {/* Edit button */}
              <Dialog>
                <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button>Edit</Button>
                </DialogTrigger>

                <DialogContent
                  className="max-h-[80vh] overflow-y-auto w-full max-w-md sm:max-w-lg rounded-xl p-6 backdrop-blur-sm"
                  forceMount
                  onClick={(e) => e.stopPropagation()}
                >
                  <DialogHeader>
                    <DialogTitle>Edit Product - {Row.name}</DialogTitle>
                    <DialogDescription>
                      Update product details here{" "}
                    </DialogDescription>
                  </DialogHeader>

                  <EditProductForm product={Row} />
                </DialogContent>
              </Dialog>
              {/* Delete button */}
              <DeleteProduct row={Row} />
            </>
          ) : (
            // invisible placeholder keeps the width
            <div className="w-full h-9" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="inline-flex items-center justify-start space-x-1 truncate w-full"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="truncate">UPDATED AT</span>
        <ArrowUpDown className="h-4 w-4 shrink-0" />
      </Button>
    ),
    cell: ({ getValue }) => (
      <span className="truncate block max-w-[150px]">
        {new Date(getValue<string>()).toLocaleString()}
      </span>
    ),
    size: 150, // optional fixed width
  },
];
