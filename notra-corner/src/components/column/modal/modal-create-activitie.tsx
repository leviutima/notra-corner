import { Plus } from "lucide-react";
import { FormCreateActivite } from "../form/form-create-activitie";
import { Modal } from "../../modal";
import { useCreateActivitie } from "@/hooks/forms/create-activitie";

interface ModalCreateActivitieProps {
  columnId: number;
  children: React.ReactNode;
}

export function ModalCreateActivitie({
  columnId,
  children,
}: ModalCreateActivitieProps) {
  const { open, setIsOpen, formCreateActivitie, onSubmit, isPending } =
    useCreateActivitie(columnId);

  return (
    <Modal
      key={columnId}
      open={open}
      onOpenChange={setIsOpen}
      title="Criar atividade"
      trigger={
        <div className="bg-neutral-900 p-1 rounded-md cursor-pointer hover:bg-neutral-700">
          <div className="flex items-center gap-2">
            <Plus size={20} />
            <h2>{children}</h2>
          </div>
        </div>
      }
      content={
        <FormCreateActivite
          form={formCreateActivitie}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      }
    />
  );
}