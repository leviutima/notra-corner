import { api } from "@/service/api";

export const deleteChecklist = async(id: number) => {
  try {
    const res = await api.delete(`/checklist/${id}`)
    return res.data
  }catch(err: any) {
    console.log(err);
    throw Error
  }
}