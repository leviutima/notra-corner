import { api } from "../api";

export const getColumnByUser = async (userId: string) => {
  try {
    const res = await api.get(`/column/user/${userId}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
