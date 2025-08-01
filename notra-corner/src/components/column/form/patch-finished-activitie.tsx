import { usePatchFinishedActivitie } from "@/hooks/forms/patch-finished-activitie";
import { useState } from "react";

interface FinishedActivitieInputProps {
  activitieId: string;
  defaultChecked?: boolean;
  isFinished: boolean;
}

export function FinishedActivitieInput({
  activitieId,
  defaultChecked,
  isFinished,
}: FinishedActivitieInputProps) {
  const { mutate } = usePatchFinishedActivitie();
  const [onChecked, setOnChecked] = useState(defaultChecked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setOnChecked(checked);
    mutate({ activitieId, finished: checked });
  };

  return (
    <input
      type="checkbox"
      checked={onChecked || isFinished}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()} 
    />
  );
}
