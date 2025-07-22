import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { FormCreateActivite } from "../form/form-create-activitie";

interface ModalCreateActivitieProps {
  columnId: number;
  children: React.ReactNode
}

export function ModalCreateActivitie({ columnId, children }: ModalCreateActivitieProps) {
  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <div className="bg-neutral-900 p-1 rounded-md cursor-pointer hover:bg-neutral-700">
          <div className="flex items-center gap-2">
            <Plus size={20} />
            <h2>{children}</h2>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-neutral-800 ">
        <DialogTitle>Criar atividade</DialogTitle>
        <FormCreateActivite columnId={columnId}/>
      </DialogContent>
    </Dialog>
  );
}
