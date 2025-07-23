import { Button } from "@/components/ui/button";
import { useUpdateActivitie } from "@/hooks/update-activitie";
import { useEffect, useState } from "react";

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
          <input type="checkbox" />
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
