import { useCreateChecklist } from "@/hooks/forms/create-checklist";
import { TitleChecklist } from "../click-state/title-checklist";
import { usePatchFinishedTitle } from "@/hooks/forms/patch-finished-checklist";
import { useState } from "react";

interface sectionChecklistProps {
  checklistId: number;
  checklistTitle: string;
  isChecked: boolean
}

export function SectionChecklist({
  checklistId,
  checklistTitle,
  isChecked
}: sectionChecklistProps) {
  const [isCheckedBox, setIsCheckedBox] = useState(false);
  const { mutate, isPending } = usePatchFinishedTitle();

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const finished = e.target.checked;
    setIsCheckedBox(finished);
    mutate({ checklistId, finished });
  };

  return (
    <div className="flex flex-col">
      <div key={checklistId} className="flex items-center gap-1">
        <input
          type="checkbox"
          checked={isChecked || isCheckedBox}
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
