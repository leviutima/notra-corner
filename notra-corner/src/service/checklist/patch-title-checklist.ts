import { api } from "../api";

interface props {
  title: string
}

export const patchTitleChecklist = async(id: number, data: props) => {
  try{
    const res = await api.patch(`/checklist/title/${id}`, data)
    return res.data
  }catch(err: any) {
    console.log(err);
    throw Error
  }
}