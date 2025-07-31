import { toast } from "sonner";
import { api } from "../api";

export const createUser = async (data: {}) => {
  try {
    const res = await api.post(`/user`, data);
    return res.data;
  } catch (err: any) {
    toast.error("Erro ao criar usuário, tente novamente");
    console.log(err);
    throw new Error(err?.response?.data?.message || "Erro desconhecido");
  }
};
