import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

type TProps = {
  open?: boolean;
  onClose: () => void;
};

const CreateProjectModal = (props: TProps) => {
  const { open, onClose } = props;
  const {} = useForm();
  return (
    <Dialog onOpenChange={() => onClose()} modal={true} open={open}>
      <DialogContent>
        <form></form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
