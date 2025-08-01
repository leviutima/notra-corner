import { ActivitieProps } from "@/utils/interfaces";
import { DndContext } from "@dnd-kit/core";
import { AlignLeft } from "lucide-react";
import { useState } from "react";
import { FinishedActivitieInput } from "./form/patch-finished-activitie";
interface cardActivitieProps {
  activities: ActivitieProps[];
}

export function CardActivitie({ activities }: cardActivitieProps) {
  return (
    <div className="flex flex-col gap-3">
      {Array.isArray(activities) &&
        activities.map((activitie: ActivitieProps) => (
          <div
            onClick={() => console.log("Abrir modal do", activitie.title)}
            className="bg-neutral-900  rounded-md p-5 flex flex-col gap-2 hover:border hover:border-white cursor-pointer transition-all duration-300 ease-in-out"
            key={activitie.id}
          >
            <div className="flex items-center gap-3">
              <FinishedActivitieInput
                activitieId={activitie.id}
                isFinished={activitie.finished}
              />
              <h1
                className={`text-start ${
                  activitie.finished ? "line-through text-gray-400" : ""
                }`}
              >
                {activitie.title}
              </h1>
            </div>
            {activitie.description ? (
              <div>
                <AlignLeft size={15} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
    </div>
  );
}
