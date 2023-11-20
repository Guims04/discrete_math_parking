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
import { apiService } from "./api.service"

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
    accessorKey: "exit_time",
    header: "Hora de saída",
    cell: (props: any) => {
      const value = props.getValue("exit_time");
      return value ? value : "-"
    }
  },
  {
    id: "actions",
    cell: (props: any) => {

      const id = props.row.getValue("id");
      const exit_time = props.row.getValue("exit_time");

      const exit = (id: number) => {
        if (exit_time) {
          apiService.removeData(props.tableReference, id).then((result: any) => {
            alert("Valor da saída: R$" + (result.data.value).toFixed(2).replace('.', ','));
            window.location.reload();
            props.openDialogById(-1);
          });
        } else {
          alert("Não é possível saída sem hora de entrada");
        }
      }
 
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
            <DropdownMenuItem onClick={() => { exit(id); }} className="text-red-500 cursor-pointer">Saída</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
