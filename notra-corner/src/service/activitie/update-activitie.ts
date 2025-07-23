import { api } from "../api";

interface updateActivitieProps {
  title?: string;
  description?: string;
}

export const updateActivitie = async (
  activitieId: string,
  data: updateActivitieProps
) => {
  try {
    const res = await api.put(`/activitie/${activitieId}`, data);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw Error;
  }
};
