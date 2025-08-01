import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FinishedActivitieFormSchema,
  finishedActivititieFormSchema,
} from "../schemas/pacth-finished-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchFinishedActivity } from "@/service/activitie/patch-finished-activitie";
import { toast } from "sonner";

interface usePatchFinishedActivitieProps {
  activitieId: string;
}

interface PatchFinishedInput {
  activitieId: string;
  finished: boolean;
}

export function usePatchFinishedActivitie() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ activitieId, finished }: PatchFinishedInput) =>
      patchFinishedActivity(activitieId, { finished }),
    mutationKey: ["activitie"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activitie"] });
    },
    onError: () => {
      toast.error("erro ao finalizar atividade");
    },
  });

  return { mutate };
}
