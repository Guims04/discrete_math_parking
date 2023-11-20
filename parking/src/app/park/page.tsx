import * as React from 'react';
import { useState } from 'react';
import { Park, columns } from "./columns";
import { DataTable } from "./data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiService } from './api.service';

export default async function ParkPlace() {
  let data = await apiService.getData();

  return (
    <Tabs defaultValue="state_1" className="w-100 p-10">
      <TabsList>
        <TabsTrigger value="state_1">Paraná</TabsTrigger>
        <TabsTrigger value="state_2">Rio Grande do Sul</TabsTrigger>
        <TabsTrigger value="state_3">Santa Catarina</TabsTrigger>
        <TabsTrigger value="others">Outros</TabsTrigger>
      </TabsList>

      <TabsContent value="state_1" className="border rounded p-3">
        <DataTable columns={columns} data={data[0] ?? []} tableReference={0} />
      </TabsContent>
      <TabsContent value="state_2" className="border rounded p-3">
        <DataTable columns={columns} data={data[1] ?? []} tableReference={1} />
      </TabsContent>
      <TabsContent value="state_3" className="border rounded p-3">
        <DataTable columns={columns} data={data[2] ?? []} tableReference={2} />
      </TabsContent>
      <TabsContent value="others" className="border rounded p-3">
        <DataTable columns={columns} data={data[3] ?? []} tableReference={3} />
      </TabsContent>
    </Tabs>
  );
}
