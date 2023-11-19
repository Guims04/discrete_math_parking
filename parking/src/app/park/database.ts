import { Park } from "./columns";

export const data: Park[][] = [
  // Paraná
  [
    {
      id: 1,
      license_plate: "BRA2E19",
      entry_time: '10:20',
      exit_time: '10:20',
    },
  ],
  
  // Rio Grande do Sul
  [
    {
      id: 1,
      license_plate: "BRA2E20",
      entry_time: '10:20',
      exit_time: '10:20',
    },
  ],

  // Santa Catarina
  [
    {
      id: 1,
      license_plate: "BRA2E21",
      entry_time: '10:20',
      exit_time: '10:20',
    },
  ],

  // Outros
  [
    {
      id: 1,
      license_plate: "BRA2E22",
      entry_time: '10:20',
      exit_time: '10:20',
    },
  ]
];

export async function getData(): Promise<Park[][]> {
  return data;
}

export async function getDataById(position: number, id: number) {
  return data[position].find((item) => item.id === id);
}

export async function addData(position: number, infos: Park): Promise<void> {
  infos.id = data[position].length + 1;
  data[position].push(infos);
}

export async function removeData(position: number, id: number): Promise<void> {
  data[position] = data[position].filter((item) => item.id !== id);
}

export async function updateData(position: number, infos: Park): Promise<void> {
  data[position] = data[position].map((item) => (item.id === infos.id ? infos : item));
}