
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from '@radix-ui/react-dropdown-menu';

interface ParkFormProps {
  openDialog?: boolean;
  onCloseDialog: () => void;
  title: string;
  description: string
}

export default function DialogAlert(props: ParkFormProps) {
  const [dialogStatus, setDialogStatus] = React.useState(false);

  React.useEffect(() => {
    setDialogStatus(!!props.openDialog);
  }, [props.openDialog]);

  const handleWithInput = async () => {
    props.onCloseDialog();
  };

  return (
    <Dialog open={dialogStatus} onOpenChange={props.onCloseDialog}>
      <DialogContent style={{padding: 60}}>
        <DialogHeader style={{gap: 10}}>
          <DialogTitle>
            {props.title}
          </DialogTitle>
          <Label>{ props.description }</Label>
          <Button onClick={handleWithInput}>Sair</Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
