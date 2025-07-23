import { Button } from "@/components/ui/button";
import { useUpdateActivitie } from "@/hooks/update-activitie";
import { useEffect, useState } from "react";

interface descriptionInputActivitieProps {
  activitieId: string;
  activitieTitle: string;
  activitieDescription: string;
}

export function DescriptionInputActivitie({
  activitieId,
  activitieTitle,
  activitieDescription,
}: descriptionInputActivitieProps) {
  const [isEditing, setIsEditing] = useState("text");
  const { isPending, update, updatedActivitie, hasSuccess, setHasSuccess } = useUpdateActivitie({
    activitieId,
  });

  const { register, handleSubmit, setValue } = updatedActivitie;

  const handleClick = () => {
    setValue('description', activitieDescription)
    setIsEditing('input')
  }

  useEffect(() => {
    if(hasSuccess) {
      setIsEditing("text")
      setHasSuccess(false)
    }
  })

  return (
    <div>
      {isEditing === "text" ? (
        <div className="cursor-pointer" onClick={handleClick}>
          <p>{activitieDescription}</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit((data) =>
            update({
              ...data,
              title: activitieTitle,
            })
          )}
        >
          <textarea
            className="border border-neutral-400 w-full p-2"
            {...register("description")}
          />
          <div className="flex items-center gap-2">
            <Button className="cursor-pointer" type="submit">
              {isPending ? "Carregando..." : "Salvar"}
            </Button>
            <Button
              type="button"
              variant={"ghost"}
              className="cursor-pointer"
              onClick={() => setIsEditing("text")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
