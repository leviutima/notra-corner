import { CheckSquare } from "lucide-react";
import { FormCreateChecklist } from "../form/form-create-checklist";
import { useCreateChecklist } from "@/hooks/forms/create-checklist";
import { Modal } from "../../modal";

interface modalCreateChecklistProps {
  activitieId: string;
}

export function ModalCreateChecklist({
  activitieId,
}: modalCreateChecklistProps) {
  const { form, onSubmit, isPending, open, setIsOpen } = useCreateChecklist({
    activitieId,
  });

  return (
    <Modal
      key={activitieId}
      onOpenChange={setIsOpen}
      open={open}
      title="Nova checklist"
      trigger={
        <div className="flex items-center gap-2 border border-neutral-400 p-1 rounded-sm shadow-md cursor-pointer hover:bg-neutral-700">
          <CheckSquare size={18} />
          <h2>Checklist</h2>
        </div>
      }
      content={
        <FormCreateChecklist
          form={form}
          isPending={isPending}
          onSubmit={onSubmit}
        />
      }
    />
  );
}
