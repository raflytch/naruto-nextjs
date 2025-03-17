import { api } from "@/lib/api";

export const getCharacters = async (page, limit) => {
  const response = await api.get(`/characters?page=${page}&limit=${limit}`);
  console.log(response.data);
  return response.data;
};
