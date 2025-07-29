import { getColumnByUser } from "@/service/column/get-column";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { ModalCreateActivitie } from "./modal/modal-create-activitie";
import { ColumnProps } from "@/utils/interfaces";
import { ModalActivitie } from "./modal/modal-activitie";
import { TitleInput } from "./click-state/title-input-column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { SortableColumn } from "./sort/sortable-column";

export function Columns() {
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    data: columnsData = [],
    isLoading,
  } = useQuery({
    queryKey: ["column"],
    queryFn: async () => getColumnByUser(user.id),
    enabled: !!user?.id,
  });
  const [columns, setColumns] = useState<ColumnProps[]>([]);

  useMemo(() => {
    if (columnsData.length > 0) {
      setColumns(columnsData);
    }
  }, [columnsData]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = columns.findIndex((c) => c.id === active.id);
    const newIndex = columns.findIndex((c) => c.id === over.id);

    const reordered = [...columns];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);

    setColumns(reordered); 
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-5 items-start overflow-x-auto">
        <SortableContext items={columnsId}>
          {columns.map((column) => (
            <SortableColumn key={column.id} id={column.id}>
              <TitleInput columnTitle={column.title} columnId={column.id} />
              <ModalActivitie columnId={column.id} />
              <ModalCreateActivitie columnId={column.id}>
                Adicionar cartão
              </ModalCreateActivitie>
            </SortableColumn>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
