import { api } from "../api"

export const deleteColumn = async(id: number) => {
  try{
    const res = await api.delete(`/column/${id}`)
    return res.data
  }catch(err: any) {
    console.log(err);
    throw Error
  }
}