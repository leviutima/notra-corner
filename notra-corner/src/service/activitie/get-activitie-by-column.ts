import { api } from "../api";

export const getActivitieByColumn = async(columnId: number) => {
  try{
    const res = await api.get(`/activitie/${columnId}`)
    return res.data
  }catch(err: any) {
    console.log(err);
    throw new Error(err?.response?.data?.message || "Erro desconhecido");
  }
}