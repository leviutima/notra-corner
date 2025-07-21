import { api } from "../api";

interface updateColumProps {
  title: string;
}

export const updateColumn = async (id:number, data: { title: string }) => {
  try {
    const res = await api.put(`/column/${id}`, data);
    return res.data
  } catch (err: any) {
    console.log(err);
  }
};
