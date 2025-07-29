import { useCreateChecklist } from "@/hooks/forms/create-checklist";
import { TitleChecklist } from "../click-state/title-checklist";
import { usePatchFinishedTitle } from "@/hooks/forms/patch-finished-checklist";
import { useState } from "react";
import { DeleteChecklist } from "../form/delete-checklist";

interface sectionChecklistProps {
  checklistId: number;
  checklistTitle: string;
  isChecked: boolean;
}

export function SectionChecklist({
  checklistId,
  checklistTitle,
  isChecked,
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
      <div
        key={checklistId}
        className="flex items-center justify-between gap-3 hover:bg-neutral-700 p-1 rounded-md cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isChecked || isCheckedBox}
            onChange={onChangeCheckbox}
          />{" "}
          <TitleChecklist
            checklistId={checklistId}
            checklistTitle={checklistTitle}
          />
        </div>
        <div className="flex items-center  gap-10">
          <div>
            <DeleteChecklist checklistId={checklistId} />
          </div>
        </div>
      </div>
    </div>
  );
}
