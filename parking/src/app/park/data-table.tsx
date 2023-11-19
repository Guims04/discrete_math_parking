"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import * as React from "react";
import { Input } from "@/components/ui/input";
import ParkForm from "./park-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  tableReference: number;
}

export function DataTable<TData, TValue>({ columns, data, tableReference }: DataTableProps<TData, TValue>, ref: any) {
  
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [formDialogStatus, setFormDialogStatus] = React.useState(false);
  const [registrationId, setRegistrationId] = React.useState(0);
  

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const openDialogById = (id: number) => {
    setRegistrationId(id);
    setFormDialogStatus(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar Placa do carro"
          value={
            (table.getColumn("license_plate")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("license_plate")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <ParkForm
          openDialog={formDialogStatus}
          onCloseDialog={() => { setFormDialogStatus(false) }}
          id={registrationId}
          tableReference={tableReference}
        />
        
        <Button
          variant="outline"
          className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-600 hover:text-white border-blue-600"
          onClick={() => { openDialogById(0) }}
        >
          <span className="sr-only">Open menu</span>
          <Plus className="h-4 w-4" />
        </Button>

      </div>

      <div className="rounded-md border">
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
                            header.getContext()
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        { ...cell.getContext(), openDialogById }
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
    </div>
  );
}
