
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

interface ParkFormProps {
  openDialog?: boolean;
  onCloseDialog?: () => void;
}

export default function ParkForm(props: ParkFormProps) {
  const [dialogStatus, setDialogStatus] = React.useState(false);

  React.useEffect(() => {
    setDialogStatus(!!props.openDialog);
  }, [props.openDialog]);

  return (
    <Dialog open={dialogStatus} onOpenChange={props.onCloseDialog} >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
