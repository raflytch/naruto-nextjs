import { getCharacters } from "@/services/character.service";
import { useQuery } from "@tanstack/react-query";

export const useCharacter = () => {
  return useQuery({
    queryKey: ["characters"],
    queryFn: () => getCharacters(1, 1431),
    staleTime: 5 * 60 * 1000,
  });
};
