import { api } from "../api";
interface patchFinishedActivitieProps {
  finished: boolean
}

export const patchFinishedActivity = async(id: string, data: patchFinishedActivitieProps) => {
  try{
    const res = await api.patch(`/activitie/finished/${id}`, data)
    return res.data
  }catch(err: any) {
    console.log(err);
    throw Error
  }
}