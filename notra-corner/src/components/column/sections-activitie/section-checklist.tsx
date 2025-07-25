import { useCreateChecklist } from "@/hooks/forms/create-checklist";
import { TitleChecklist } from "../click-state/title-checklist";

interface sectionChecklistProps {
  activitieId: string;
  checklistId: number;
  checklistTitle: string;
}

export function SectionChecklist({
  activitieId,
  checklistId,
  checklistTitle,
}: sectionChecklistProps) {

  return (
    <div className="flex flex-col ">
      <div key={checklistId} className="flex items-center gap-1">
        <input type="checkbox" />
        <TitleChecklist checklistId={checklistId} checklistTitle={checklistTitle}/>
      </div>
    </div>
  );
}
