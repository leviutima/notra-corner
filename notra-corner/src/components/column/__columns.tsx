import { getColumnByUser } from "@/service/column/get-column";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { ModalCreateActivitie } from "./modal/modal-create-activitie";
import { ColumnProps } from "@/utils/interfaces";
import { ModalActivitie } from "./modal/modal-activitie";
import { TitleInput } from "./click-state/title-input-column";

export function Columns() {
  const { user } = useSelector((state: RootState) => state.auth);

  const {
    data: columns,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["column"],
    queryFn: async () => getColumnByUser(user.id),
    enabled: !!user?.id,
  });

  console.log(columns);

  return (
    <div className="flex gap-5 items-start">
      {Array.isArray(columns) &&
        columns.map((column: ColumnProps) => (
          <div
            key={column.id}
            className="bg-neutral-800 flex w-[280px] flex-col gap-2 p-3 rounded-md"
          >
            <TitleInput columnTitle={column.title} columnId={column.id} />
            <ModalActivitie columnId={column.id} key={column.id}/>
            <ModalCreateActivitie columnId={column.id}>
              Adcionar cartão
            </ModalCreateActivitie>
          </div>
        ))}
    </div>
  );
}