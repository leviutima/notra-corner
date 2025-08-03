import { api } from "../api";

interface forgotPasswordProps {
  email: string
}

export const forgotPassword = async(data: forgotPasswordProps) => {
  try{
    const res = await api.post(`/user/forgot-password`, data)
    return res.data
  }catch(err: any) {
    console.log(err);
    throw Error
  }
}