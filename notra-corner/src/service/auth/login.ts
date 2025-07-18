import { api } from "../api";

export const login = async (data: {}) => {
  try {
    const res = await api.post(`/auth/login`, data);
        console.log("sucesso");
    return res.data
  } catch (err: any) {
    console.log(err);
    throw new Error(err?.response?.data?.message || "Erro desconhecido");
  }
};
