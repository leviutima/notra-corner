import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { CardActivitie } from "./__card-activitie";
import { useQuery } from "@tanstack/react-query";
import { getActivitieByColumn } from "@/service/activitie/get-activitie-by-column";
import { ActivitieProps } from "@/utils/interfaces";
import { AlignLeft } from "lucide-react";

interface modalActivitieProps {
  columnId: number;
}

export function ModalActivitie({ columnId }: modalActivitieProps) {
  const {
    data: activities,
    // isLoading,
    error,
  } = useQuery({
    queryKey: ["activities", columnId],
    queryFn: () => getActivitieByColumn(columnId),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Dialog>
      <DialogTrigger>
        <CardActivitie activities={activities} />
      </DialogTrigger>
      {Array.isArray(activities) &&
        activities.map((activitie: ActivitieProps) => (
          <DialogContent key={activitie.id}>
            <DialogHeader>
              <DialogTitle>{activitie.title}</DialogTitle>
            </DialogHeader> 
            <div>
              <AlignLeft size={15} />
              <p>{activitie.description}</p>
            </div>
          </DialogContent>
        ))}
    </Dialog>
  );
}
