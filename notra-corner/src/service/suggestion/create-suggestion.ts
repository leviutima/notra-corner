import { api } from "../api";

interface suggestionProps {
  name: string;
  surname: string;
  email: string;
  suggestion: string;
}

export const createSuggestion = async (data: suggestionProps) => {
  try {
    const res = await api.post(`/suggestion`, data);
    return res.data;
  } catch (err: unknown) {
    console.log(err);
    throw Error;
  }
};
