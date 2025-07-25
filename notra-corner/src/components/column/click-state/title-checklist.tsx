import { Button } from "@/components/ui/button";
import { useState } from "react";

interface titleChecklistProps {
  checklistTitle: string;
}

export function TitleChecklist({ checklistTitle }: titleChecklistProps) {
  const [hasEditing, setHasEditing] = useState(false);

  return (
    <div>
      {!hasEditing ? (
        <div onClick={() => setHasEditing(true)}>
          <h3>{checklistTitle}</h3>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <input type="text" className="border border-neutral-400 rounded-md p-1" />
          <Button>Salvar</Button>
        </div>
      )}
    </div>
  );
}
