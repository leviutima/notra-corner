import { ModalCreateActivitie } from "./modal/modal-create-activitie";
import { ModalActivitie } from "./modal/modal-activitie";
import { TitleInput } from "./click-state/title-input-column";
import { useColumnSearch } from "@/context/useChangeSearchContext";

export function Columns() {
  const { filteredColumns } = useColumnSearch();

  if (filteredColumns.length === 0) {
    return <div className="text-neutral-400"></div>;
  }

  return (
    <div className="flex gap-5 items-start">
      {filteredColumns.map((column) => (
        <div
          key={column.id}
          className="bg-neutral-800 flex w-[280px] flex-col gap-2 p-3 rounded-md"
        >
          <TitleInput columnTitle={column.title} columnId={column.id} />
          <ModalActivitie columnId={column.id} />
          <ModalCreateActivitie columnId={column.id}>
            Adicionar cartão
          </ModalCreateActivitie>
        </div>
      ))}
    </div>
  );
}
