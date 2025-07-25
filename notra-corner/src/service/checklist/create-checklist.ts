import { api } from "../api";

interface createChecklistReqProps {
  title: string;
  finished: boolean;
  activitieId: string;
}

export const createChecklist = async (data: createChecklistReqProps) => {
  try {
    const res = await api.post(`/checklist`, data);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw Error;
  }
};
