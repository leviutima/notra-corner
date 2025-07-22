import { Button } from "@/components/ui/button";
import { useState } from "react";

interface descriptionInputActivitieProps {
  activitieDescription: string;
}

export function DescriptionInputActivitie({
  activitieDescription,
}: descriptionInputActivitieProps) {
  const [isEditing, setIsEditing] = useState("text");

  return (
    <div>
      {isEditing === "text" ? (
        <div className="cursor-pointer" onClick={() => setIsEditing("input")}>
          <p>{activitieDescription}</p>
        </div>
      ) : (
        <div>
          <textarea className="border border-neutral-400 w-full p-2" />
          <div className="flex items-center gap-2">
            <Button className="cursor-pointer">Salvar</Button>
            <Button variant={"ghost"} className="cursor-pointer" onClick={() => setIsEditing("text")}>
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
