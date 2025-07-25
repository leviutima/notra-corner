import { api } from "../api";

export const patchFinishedChecklist = async(id: number, finished: boolean) =>{
  try{  
    const res = await api.patch(`/checklist/finished/${id}`);
    return res.data
  }catch(err: any) {
      console.log(err);
      throw Error
  }
}