import { api } from "../api";

export const deleteActivitie = async (id: string) => {
  try {
    const res = await api.delete(`/activitie/${id}`);
    return res.data
  } catch (err: any) {
    console.log(err);
    throw Error;
  }
};
