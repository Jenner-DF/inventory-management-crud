/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllProducts } from "@/lib/actions/actions";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { DataTablePagination } from "./table-pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import DeleteAllSelectedProducts from "@/components/custom/DeleteAllSelectedProducts";
import { ProductFormValues } from "@/lib/types/product";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  userId: string;
}

export function DataTable<TData, TValue>({
  columns,
  userId,
}: DataTableProps<TData>) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["productsData", userId],
    queryFn: () => getAllProducts(userId),
  });

  // TypeScript infers data as TData[]
  const tableData = data as TData[];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  //select rows
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  //no tanstack magic edit, need to build, did not push through, i used modal form instead
  // const [editingRowId, setEditingRowId] = useState<string | null>(null);
  // const [editValues, setEditValues] = useState({});

  const table = useReactTable<TData>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    //pagination
    getPaginationRowModel: getPaginationRowModel(),
    //sort
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    //filter
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    //column  visibility
    onColumnVisibilityChange: setColumnVisibility,
    //select rows,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => (row as any).id, //haha always true no extend interface needed! :D
    //state
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products.</div>;
  const rowSelections = table.getFilteredSelectedRowModel().rows;
  const selectedRows = rowSelections.map(({ original }) => original);
  return (
    <div>
      {/* Filter by email ui */}
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter products..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div>
          <DeleteAllSelectedProducts
            selectedRows={selectedRows as ProductFormValues[]}
          />
          {/* Column Visibility ui */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="z-50 bg-popover text-popover-foreground shadow-md rounded-md p-2"
              sideOffset={4} // optional: adds spacing from the trigger
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize z-50 p-2 hover:bg-gray-200"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined} // valid HTML
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      onClick={() => row.toggleSelected(!row.getIsSelected())}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
