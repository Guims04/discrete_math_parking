
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Park } from "./columns";
import { Label } from '@radix-ui/react-dropdown-menu';
import { getDataById, updateData } from './database';

interface ParkFormProps {
  openDialog?: boolean;
  onCloseDialog: () => void;
  id?: number;
  tableReference: number;
}

export default function ParkForm(props: ParkFormProps) {
  const [data, setData] = React.useState<Park | undefined>(undefined);
  const [dialogStatus, setDialogStatus] = React.useState(false);
  const [plate, setPlate] = React.useState<string | undefined>("");
  const [entryTime, setEntryTime] = React.useState<string | undefined>("");

  React.useEffect(() => {
    setDialogStatus(!!props.openDialog);
  }, [props.openDialog]);

  React.useEffect(() => {
    if (props.id && props.id !== 0) {
      getDataById(props.tableReference, props.id ?? 1).then((result) => {
        setData(result);
        setPlate(result?.license_plate);
        setEntryTime(result?.entry_time);
      });
    } else {
      setPlate("");
      setEntryTime("");
    }
  }, [props.id]);


  const handleWithInput = () => {
    if (plate != "" && entryTime != "") {
      if (props.id != 0) {
        const data: Park = {
          id: props.id ?? 0,
          entry_time: entryTime ?? '',
          license_plate: plate ?? '',
        }
        updateData(0, data);
        props.onCloseDialog();
      } else {
        
      }
    } else {
      return alert('Insira valores válidos.');
    }
  };

  return (
    <Dialog open={dialogStatus} onOpenChange={props.onCloseDialog}>
      <DialogContent style={{padding: 60}}>
        <DialogHeader style={{gap: 10}}>
          <DialogTitle>
            Adicione as informações para estacionamento do carro!
          </DialogTitle>
          <Label>ID: {props?.id ?? 0}</Label>
          <Input
            type="text"
            placeholder="Placa"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
          />
          <Input
            type="string"
            placeholder="Hora de entrada"
            value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}
          />
          <Button onClick={handleWithInput}>Salvar</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
