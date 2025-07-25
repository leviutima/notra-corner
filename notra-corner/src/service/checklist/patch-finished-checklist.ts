import { api } from "../api";

interface patchFinishedChecklistProps {
  finished: boolean;
}

export const patchFinishedChecklist = async (
  id: number,
  data: patchFinishedChecklistProps
) => {
  try {
    const res = await api.patch(`/checklist/finished/${id}`, data);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw Error;
  }
};
