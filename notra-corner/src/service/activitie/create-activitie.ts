import { api } from "../api";

interface ActivitieProps {
  title: string;
  description?: string;
}

export const createActivitie = async (data: ActivitieProps) => {
  try {
    const res = await api.post(`/activitie`, data);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err?.response?.data?.message || "Erro desconhecido");
  }
};
