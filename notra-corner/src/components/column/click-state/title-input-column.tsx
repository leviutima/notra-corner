import { Ellipsis, GripVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUpdateColumn } from "@/hooks/forms/update-column";
import { Button } from "@/components/ui/button";
import { StateColumnEllipsis } from "../form/delete-column";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

interface titleInputProps {
  columnId: number;
  columnTitle: string;
    listeners?:  React.HTMLAttributes<HTMLElement>;
}

export function TitleInput({ columnTitle, columnId ,listeners}: titleInputProps) {
  const [isEditing, setIsEditing] = useState("text");
  const { formUpdate, isPending, onSubmit, hasSuccess, setHasSuccess } =
    useUpdateColumn({ columnId });
  const { register, handleSubmit, watch, setValue } = formUpdate;
  const titleValue = watch("title");
  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsEditing("text");
      }
    }
    if (isEditing === "input") {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  useEffect(() => {
    if (hasSuccess) {
      setIsEditing("text");
      setHasSuccess(false);
    }
  }, [hasSuccess, setHasSuccess]);

  return (
    <div>
      {isEditing === "text" && (
        <div className="flex flex-row justify-between">
          <div
          {...listeners}
          className="cursor-pointer"
            onClick={() => {
              setIsEditing("input");
              setValue("title", columnTitle);
            }}
          >
            <h1>{columnTitle}</h1>
          </div>
          <StateColumnEllipsis columnId={columnId}/>
        </div>
      )}
      {isEditing === "input" && (
        <form ref={ref} className="flex " onSubmit={handleSubmit(onSubmit)}>
          <input className="outline-none" {...register("title")} />
          {titleValue === "" ? (
            <Button
              className="cursor-pointer"
              onClick={() => setIsEditing("text")}
            >
              Cancelar
            </Button>
          ) : (
            <Button type="submit">
              {isPending ? "Carregando..." : "Atualizar"}
            </Button>
          )}
        </form>
      )}
    </div>
  );
}
