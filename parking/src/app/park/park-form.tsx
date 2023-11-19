
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Park } from "./columns";
import { AddingCars } from "./total_parked";

interface ParkFormProps {
  openDialog?: boolean;
  onCloseDialog?: () => void;
}

export default function ParkForm(props: ParkFormProps) {
  const [dialogStatus, setDialogStatus] = React.useState(false);
  const [entryOfCar, setEntryOfCar] = React.useState([{}]);
  const [plate, setPlate] = React.useState("");
  const [entryTime, setEntryTime] = React.useState("");

  const handleWithData = (plate: string, entryTime: string) => {
    setEntryOfCar((previousState) => {
      const updatePreviousTotalOfCars = [
        {
          license_plate: plate,
          entry_time: entryTime,
        },
        ...previousState,
      ];

      return updatePreviousTotalOfCars;
    });
  };

  (entryOfCar.length > 1) && AddingCars(entryOfCar);

  const handleWithInput = () => {
    if (plate != "" && entryTime != "") {
      handleWithData(plate, entryTime);

      setPlate("");
      setEntryTime("");
    } else {
      return alert('Insira valores válidos e certifique-se que todos os campos estão preenchidos.');
    }
  };

  React.useEffect(() => {
    setDialogStatus(!!props.openDialog);
  }, [props.openDialog]);

  return (
    <Dialog open={dialogStatus} onOpenChange={props.onCloseDialog}>
      <DialogContent style={{padding: 60}}>
        <DialogHeader style={{gap: 10}}>
          <DialogTitle>
            Adicione as informações para estacionamento do carro!
          </DialogTitle>
          <Input
            type="text"
            placeholder="Placa"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
          />
          <Input
            type="time"
            placeholder="Hora de entrada"
            value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}
          />
          <Button onClick={handleWithInput}>Adicionar</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
