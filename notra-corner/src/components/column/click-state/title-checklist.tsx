import { Button } from "@/components/ui/button";
import { usePatchTitleChecklist } from "@/hooks/forms/patch-title-checklist";
import { useEffect, useRef, useState } from "react";

interface titleChecklistProps {
  checklistId: number;
  checklistTitle: string;
}

export function TitleChecklist({
  checklistTitle,
  checklistId,
}: titleChecklistProps) {
  const [hasEditing, setHasEditing] = useState(false);
  const { form, onSubmit, isPending ,hasSucces,setHasSuccess} = usePatchTitleChecklist({ checklistId });
  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setHasEditing(false);
      }
    }
    if (hasEditing === true) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hasEditing]);

  const { register, handleSubmit, setValue } = form;

  useEffect(() => {
    setValue('title', checklistTitle)
  }, [])

  useEffect(() => {
    if(hasSucces) {
      setHasEditing(false)
      setHasSuccess(false)
    }
  }, [hasSucces])

  return (
    <div className="">
      {!hasEditing ? (
        <div onClick={() => setHasEditing(true)} className="cursor-pointer">
          <h3>{checklistTitle}</h3>
        </div>
      ) : (
        <form
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            className="border border-neutral-400 rounded-md p-1 "
            {...register("title")}
          />
          <Button type="submit" className="cursor-pointer">
            {isPending ? "Carregando..." : "Salvar"}
          </Button>
        </form>
      )}
    </div>
  );
}
