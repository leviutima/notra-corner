import { ActivitieProps } from "@/utils/interfaces";
import { AlignLeft } from "lucide-react";
import { useState } from "react";
interface cardActivitieProps {
  activities: ActivitieProps[];
}

export function CardActivitie({ activities }: cardActivitieProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const handleClick = (id: string) => {
    setSelected((prev) => (prev === id ? null : id));
  };

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
              <input
                type="checkbox"
                checked={selected === activitie.id}
                onChange={() => handleClick(activitie.id)}
                onClick={(e) => e.stopPropagation()}
              />
              <h1>{activitie.title}</h1>
            </div>
            <div>
              <AlignLeft size={15} />
            </div>
          </div>
        ))}
    </div>
  );
}
