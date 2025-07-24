import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckSquare } from "lucide-react";

export function ModalCreateChecklist() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 border border-neutral-400 p-1 rounded-sm shadow-md cursor-pointer hover:bg-neutral-700">
          <CheckSquare size={18} />
          <h2>Checklist</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Checklist</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
