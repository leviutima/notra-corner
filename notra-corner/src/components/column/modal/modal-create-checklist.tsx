import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckSquare } from "lucide-react";
import { FormCreateChecklist } from "../form/form-create-checklist";

interface modalCreateChecklistProps {
  activitieId: string
}

export function ModalCreateChecklist({activitieId}: modalCreateChecklistProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 border border-neutral-400 p-1 rounded-sm shadow-md cursor-pointer hover:bg-neutral-700">
          <CheckSquare size={18} />
          <h2>Checklist</h2>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-neutral-800">
        <DialogHeader>
          <DialogTitle>Nova Checklist</DialogTitle>
        </DialogHeader>
        <FormCreateChecklist activitieId={activitieId}/>
      </DialogContent>
    </Dialog>
  );
}
