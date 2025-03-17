"use client";

import React, { useState } from "react";
import { useCharacter } from "@/hooks/useCharacter";
import CharacterCard from "@/components/CharacterCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const CHARACTERS_PER_PAGE = 9;
const PAGINATION_DISPLAY_COUNT = 5;

const CharacterGrid = () => {
  const { data, isError, isLoading } = useCharacter();
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg overflow-hidden shadow-md bg-white"
            >
              <Skeleton className="h-52 w-full" />
              <div className="p-5 space-y-4">
                <Skeleton className="h-8 w-2/3" />
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full bg-red-50 border-l-4 border-red-500 p-8 rounded-lg text-center shadow-md">
        <h3 className="text-red-600 font-medium text-xl mb-2">
          Error fetching character data
        </h3>
        <p className="text-red-500">
          Unable to load characters. Please try again later.
        </p>
      </div>
    );
  }

  if (!data || !data.characters || !data.characters.length) {
    return (
      <div className="w-full bg-yellow-50 border-l-4 border-yellow-500 p-8 rounded-lg text-center shadow-md">
        <h3 className="text-yellow-700 font-medium text-xl mb-2">
          No character data available
        </h3>
        <p className="text-yellow-600">
          We couldn't find any characters to display.
        </p>
      </div>
    );
  }

  const characters = data.characters;
  const totalPages = Math.ceil(characters.length / CHARACTERS_PER_PAGE);

  const indexOfLastCharacter = currentPage * CHARACTERS_PER_PAGE;
  const indexOfFirstCharacter = indexOfLastCharacter - CHARACTERS_PER_PAGE;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  const getPaginationGroup = () => {
    const start =
      Math.floor((currentPage - 1) / PAGINATION_DISPLAY_COUNT) *
      PAGINATION_DISPLAY_COUNT;
    return new Array(Math.min(PAGINATION_DISPLAY_COUNT, totalPages - start))
      .fill()
      .map((_, idx) => start + idx + 1);
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="bg-white shadow-lg rounded-full px-6 py-3 inline-flex items-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer hover:text-orange-600 transition-colors"
                    }
                  />
                </PaginationItem>

                {currentPage > PAGINATION_DISPLAY_COUNT && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setCurrentPage(1)}
                        className="hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  </>
                )}

                {getPaginationGroup().map((number) => (
                  <PaginationItem key={number}>
                    <PaginationLink
                      onClick={() => setCurrentPage(number)}
                      isActive={currentPage === number}
                      className={
                        currentPage === number
                          ? "bg-orange-500 text-white hover:bg-orange-600"
                          : "hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      }
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {currentPage < totalPages - PAGINATION_DISPLAY_COUNT + 1 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setCurrentPage(totalPages)}
                        className="hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer hover:text-orange-600 transition-colors"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterGrid;
