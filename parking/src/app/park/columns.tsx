"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export type Park = {
  id: number,
  license_plate: string,
  entry_time: string,
  exit_time?: string
}

export const columns: ColumnDef<Park>[] = [
  {
    accessorKey: "id",
    header: "#"
  },
  {
    accessorKey: "license_plate",
    header: "Placa",
  },
  {
    accessorKey: "entry_time",
    header: "Hora de entrada",
  },
  {
    id: "actions",
    cell: (props: any) => {

      const id = props.row.getValue("id");
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => { props.openDialogById(id) }} className="cursor-pointer">
              Altera informações
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 cursor-pointer">Saída</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
