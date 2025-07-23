import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { CardActivitie } from "../__card-activitie";
import { useQuery } from "@tanstack/react-query";
import { getActivitieByColumn } from "@/service/activitie/get-activitie-by-column";
import { ActivitieProps } from "@/utils/interfaces";
import { AlignLeft } from "lucide-react";
import { DescriptionInputActivitie } from "../click-state/description-input-activitie";
import { ModalCreateActivitie } from "./modal-create-activitie";

interface modalActivitieProps {
  columnId: number;
}

export function ModalActivitie({ columnId }: modalActivitieProps) {
  const {
    data: activities,
    // isLoading,
    error,
  } = useQuery({
    queryKey: ["activitie", columnId],
    queryFn: () => getActivitieByColumn(columnId),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <CardActivitie activities={activities} />
      </DialogTrigger>
      {Array.isArray(activities) &&
        activities.map((activitie: ActivitieProps) => (
          <DialogContent className="bg-neutral-800" key={activitie.id}>
            <DialogHeader>
              <DialogTitle className="text-[30px]">
                {activitie.title}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col  gap-5">
              <div className="flex items-center gap-2">
                <AlignLeft size={20} />
                <h2 className="font-semibold">Descrição</h2>
              </div>
              <DescriptionInputActivitie
                activitieId={activitie.id}
                activitieTitle={activitie.title}
                activitieDescription={activitie.description}
              />
            </div>
          </DialogContent>
        ))}
    </Dialog>
  );
}
