import { useCreateChecklist } from "@/hooks/forms/create-checklist";
import { TitleChecklist } from "../click-state/title-checklist";
import { usePatchFinishedTitle } from "@/hooks/forms/patch-finished-checklist";
import { useState } from "react";

interface sectionChecklistProps {
  activitieId: string;
  checklistId: number;
  checklistTitle: string;
}

export function SectionChecklist({
  checklistId,
  checklistTitle,
}: sectionChecklistProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { mutate, isPending } = usePatchFinishedTitle();

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const finished = e.target.checked;
    setIsChecked(finished);
    mutate({ checklistId, finished });
  };

  return (
    <div className="flex flex-col">
      <div key={checklistId} className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChangeCheckbox}
        />
        <TitleChecklist
          checklistId={checklistId}
          checklistTitle={checklistTitle}
        />
      </div>
    </div>
  );
}
