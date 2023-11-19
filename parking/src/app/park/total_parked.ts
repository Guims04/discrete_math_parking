import { Park } from "./columns";

export let parkedPlace: any;

export function AddingCars(current?: any) {
  if (current.length > 1) parkedPlace = current;

  return parkedPlace;
}
