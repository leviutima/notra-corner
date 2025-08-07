import { api } from "../api";

interface props {
  userId: string
  password: string
}

export const updatePassword = async ({userId,password}: props) => {
  try {
    const res = await api.put(`/user/update-password/${userId}`, { password }); 
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw Error;
  }
};

