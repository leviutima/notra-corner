import { api } from "../api";

interface columnProps {
  title: string,
}

export const createColumn = async(data: columnProps) => {
  try{
    const res = await api.post(`/column`, data)
    return res.data
  }catch(err: unknown) {
    console.log(err);
    
  }
}