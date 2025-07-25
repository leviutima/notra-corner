import { useCreateChecklist } from "@/hooks/forms/create-checklist";

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
        <h3 className="text-[18px]">{checklistTitle}</h3>
      </div>
    </div>
  );
}
