import * as React from 'react';
import { useState } from 'react';
import { Park, columns } from "./columns";
import { DataTable } from "./data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getData(): Promise<Park[]> {
  return [
    {
      id: 1,
      license_plate: "BRA2E19",
      entry_time: new Date(),
      exit_time: new Date(),
    },
  ];
}

export default async function ParkPlace() {
  const data = await getData();

  return (
    <Tabs defaultValue="state_1" className="w-100 p-10">
      <TabsList>
        <TabsTrigger value="state_1">Paraná</TabsTrigger>
        <TabsTrigger value="state_2">Rio Grande do Sul</TabsTrigger>
        <TabsTrigger value="state_3">Santa Catarina</TabsTrigger>
      </TabsList>

      <TabsContent value="state_1" className="border rounded p-3">
        <DataTable columns={columns} data={data} />
      </TabsContent>
      <TabsContent value="state_2" className="border rounded p-3">
        <DataTable columns={columns} data={data}  />
      </TabsContent>
      <TabsContent value="state_3" className="border rounded p-3">
        <DataTable columns={columns} data={data} />
      </TabsContent>
    </Tabs>
  );
}
