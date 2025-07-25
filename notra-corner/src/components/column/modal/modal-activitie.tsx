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
import { ActivitieProps, ChecklistProps } from "@/utils/interfaces";
import { AlignLeft } from "lucide-react";
import { DescriptionInputActivitie } from "../click-state/description-input-activitie";
import { TitleInputActivitie } from "../click-state/title-input-activitie";
import { DeleteActivitie } from "../form/delete-activitie";
import { ModalCreateChecklist } from "./modal-create-checklist";
import { SectionActivitie } from "../sections-activitie/section-buttons";
import { SectionChecklist } from "../sections-activitie/section-checklist";
import { DescriptionInputNull } from "../click-state/description-input-null";

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

  console.log(activities);

  return (
    <>
      {Array.isArray(activities) &&
        activities.map((activitie: ActivitieProps) => (
          <Dialog key={activitie.id}>
            <DialogTrigger>
              <CardActivitie activities={[activitie]} />
            </DialogTrigger>
            <DialogContent className="bg-neutral-800 p-5">
              <DialogHeader>
                <DialogTitle className="text-[30px]">
                  <TitleInputActivitie
                    activitieId={activitie.id}
                    activitieDescription={activitie.description}
                    activitieTitle={activitie.title}
                  />
                </DialogTitle>
              </DialogHeader>
              <SectionActivitie activitieId={activitie.id} />
              <div className="flex flex-col  gap-5">
                <div className="flex items-center gap-2">
                  <AlignLeft size={20} />
                  <h2 className="font-semibold">Descrição</h2>
                </div>
                {!activitie.description?.trim() ? (
                  <DescriptionInputNull
                    activitieId={activitie.id}
                    activitieTitle={activitie.title}
                    activitieDescription={activitie.description}
                  />
                ) : (
                  <DescriptionInputActivitie
                    activitieId={activitie.id}
                    activitieTitle={activitie.title}
                    activitieDescription={activitie.description}
                  />
                )}
              </div>
              {activitie.checkLists?.map((checklist: ChecklistProps) => (
                <SectionChecklist
                  key={checklist._id}
                  checklistId={checklist._id}
                  checklistTitle={checklist._title}
                />
              ))}
            </DialogContent>
          </Dialog>
        ))}
    </>
  );
}
