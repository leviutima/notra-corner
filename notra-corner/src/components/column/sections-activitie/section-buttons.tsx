import { DeleteActivitie } from "../form/delete-activitie";
import { ModalCreateChecklist } from "../modal/modal-create-checklist";

interface sectionActivitieProps {
  activitieId: string,
}

export function SectionActivitie({activitieId}: sectionActivitieProps) {
  return (
    <div className="flex items-center gap-4">
      <DeleteActivitie activitieId={activitieId} />
      <ModalCreateChecklist activitieId={activitieId} />
    </div>
  );
}
