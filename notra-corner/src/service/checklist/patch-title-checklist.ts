import { api } from "../api";

export const patchTitleChecklist = async(id: number, title: string) => {
  try{
    const res = await api.patch(`/checklist${id}`, title)
    return res.data
  }catch(err: any) {
    console.log(err);
    throw Error
  }
}