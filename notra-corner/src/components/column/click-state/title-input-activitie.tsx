import { Button } from "@/components/ui/button";
import { useUpdateActivitie } from "@/hooks/forms/update-activitie";
import { useEffect, useState } from "react";
import { FinishedActivitieInput } from "../form/patch-finished-activitie";

interface titleInputActivitieProps {
  activitieTitle: string;
  activitieId: string;
  activitieDescription: string;
  isFinished: boolean
}

export function TitleInputActivitie({
  activitieDescription,
  activitieId,
  activitieTitle,
  isFinished,
}: titleInputActivitieProps) {
  const [hasEditing, setHasEditing] = useState("text");
  const { update, updatedActivitie, setHasSuccess, hasSuccess, isPending } =
    useUpdateActivitie({ activitieId });
  const { register, handleSubmit, setValue } = updatedActivitie;

  const handleClick = () => {
    setHasEditing("input")
    setValue("title", activitieTitle)
  }

  useEffect(() => {
    if(hasSuccess) {
      setHasEditing("text")
      setHasSuccess(false)
    }
  })

  return (
    <div>
      {hasEditing === "text" ? (
        <div className="flex items-center gap-2">
          <FinishedActivitieInput activitieId={activitieId} isFinished={isFinished}/>
          <h1 onClick={handleClick} className="cursor-pointer">
            {activitieTitle}
          </h1>
        </div>
      ) : (
        <form
          className="flex flex-col  gap-2"
          onSubmit={handleSubmit((data) =>
            update({ ...data, description: activitieDescription })
          )}
        >
          <input
            className="border border-neutral-400 rounded-md py-1 px-3"
            {...register("title")}
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="cursor-pointer"
              variant={"ghost"}
              onClick={() => setHasEditing("text")}
            >
              Cancelar
            </Button>
            <Button type="submit" className="cursor-pointer" >
              {isPending ? "Carregar..." : "Salvar"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
