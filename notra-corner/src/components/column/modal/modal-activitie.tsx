import { useQuery } from "@tanstack/react-query";
import { getActivitieByColumn } from "@/service/activitie/get-activitie-by-column";
import { ActivitieProps, ChecklistProps } from "@/utils/interfaces";
import { AlignLeft, Check } from "lucide-react";
import { DescriptionInputActivitie } from "../click-state/description-input-activitie";
import { TitleInputActivitie } from "../click-state/title-input-activitie";
import { SectionActivitie } from "../sections-activitie/section-buttons";
import { SectionChecklist } from "../sections-activitie/section-checklist";
import { DescriptionInputNull } from "../click-state/description-input-null";
import { CardActivitie } from "../__card-activitie";
import { Modal } from "../../modal";

interface modalActivitieProps {
  columnId: number;
}

export function ModalActivitie({ columnId }: modalActivitieProps) {
  const {
    data: activities,
  } = useQuery({
    queryKey: ["activitie", columnId],
    queryFn: () => getActivitieByColumn(columnId),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      {Array.isArray(activities) &&
        activities.map((activitie: ActivitieProps) => {
          return (
            <Modal
              key={activitie.id}
              title=""
              trigger={<CardActivitie activities={[activitie]} />}
              content={
                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-2">
                    <TitleInputActivitie
                      activitieId={activitie.id}
                      activitieDescription={activitie.description}
                      activitieTitle={activitie.title}
                      isFinished={activitie.finished}
                    />
                    <SectionActivitie activitieId={activitie.id} />
                  </div>

                  <div className="flex flex-col">
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
                  {activitie.checkLists.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Check size={20} />
                        <h1 className="text-[20px]">Sua Checklist</h1>
                      </div>
                      {activitie.checkLists.map((checklist: ChecklistProps) => (
                        <SectionChecklist
                          key={checklist._id}
                          isChecked={checklist._finished}
                          checklistId={checklist._id}
                          checklistTitle={checklist._title}
                        />
                      ))}
                    </div>
                  )}
                </div>
              }
            />
          );
        })}
    </>
  );
}
