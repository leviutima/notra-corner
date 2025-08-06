import { api } from "../api";

interface enterCodeProps {
  userId?: string,
  code: string
}

export const enterCode = async (data: enterCodeProps) => {
  try {
    const res = await api.post(`/user/verification-code`, data);
    return res.data
  } catch (err: any) {
    console.log(err);
    throw Error;
  }
};
