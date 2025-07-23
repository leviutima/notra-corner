import { Button } from "@/components/ui/button";
import { useState } from "react";

interface titleInputActivitieProps {
  activitieTitle: string;
  activitieId: string;
  activitieDescription: string;
}

export function TitleInputActivitie({
  activitieDescription,
  activitieId,
  activitieTitle,
}: titleInputActivitieProps) {
  const [hasEditing, setHasEditing] = useState("text");

  return (
    <div>
      {hasEditing === "text" ? (
        <div className="flex items-center gap-2">
          <input type="checkbox" />
          <h1 onClick={() => setHasEditing("input")} className="cursor-pointer">
            {activitieTitle}
          </h1>
        </div>
      ) : (
        <div className="flex flex-col  gap-2">
          <input className="border border-neutral-400 rounded-md" />
          <div className="flex justify-end gap-2">
            <Button
              className="cursor-pointer"
              variant={"ghost"}
              onClick={() => setHasEditing("text")}
            >
              Cancelar
            </Button>
            <Button>Salvar</Button>
          </div>
        </div>
      )}
    </div>
  );
}
