"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Zap, ScrollText, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

const CharacterCard = ({ character }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!character) return null;

  const characterImage =
    character.images && character.images.length > 0
      ? character.images[0]
      : null;

  const clan = character.personal?.clan || "Unknown";
  const rank =
    character.rank?.ninjaRank?.Gaiden ||
    character.rank?.ninjaRank?.["Part I"] ||
    "Unknown";
  const mainAffiliation =
    character.personal?.affiliation && character.personal.affiliation.length > 0
      ? character.personal.affiliation[0]
      : "Unknown";

  const primaryJutsu = character.jutsu?.slice(0, 2) || [];

  const primaryNature =
    character.natureType && character.natureType.length > 0
      ? character.natureType[0].split(" ")[0]
      : "Unknown";

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:border-orange-300 group py-0 ${
        isHovered
          ? "shadow-lg shadow-orange-100 transform -translate-y-1"
          : "shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden bg-gradient-to-r from-orange-500 to-red-500">
        {characterImage ? (
          <div className="relative h-full w-full">
            <Image
              src={characterImage}
              alt={character.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
              priority={false}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Star className="h-16 w-16 text-white/20" />
          </div>
        )}

        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-3 right-3 h-8 w-8 rounded-full ${
            isFavorited
              ? "bg-red-100 text-red-500"
              : "bg-white/30 text-white hover:bg-white/50"
          }`}
          onClick={handleFavoriteToggle}
        >
          <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
        </Button>

        <div className="absolute bottom-0 left-0 p-4 w-full">
          <Badge
            variant="outline"
            className="mb-2 border-none bg-white/20 backdrop-blur-sm text-white"
          >
            {rank}
          </Badge>
          <h2 className="text-white text-2xl font-bold truncate">
            {character.name}
          </h2>
          <p className="text-white/70 text-sm flex items-center gap-1 truncate">
            <span>{clan} Clan</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/50"></span>
            <span>{mainAffiliation}</span>
          </p>
        </div>
      </div>

      <CardContent className="pt-5 pb-0">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-500 flex items-center gap-1.5 mb-2">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              SIGNATURE JUTSU
            </h3>
            <ul className="text-sm space-y-1.5">
              {primaryJutsu.length > 0 ? (
                primaryJutsu.map((jutsu, index) => (
                  <li key={index} className="truncate flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-amber-300"></span>
                    {jutsu}
                  </li>
                ))
              ) : (
                <li className="text-slate-400 italic">Unknown jutsu</li>
              )}
            </ul>
          </div>

          <div className="border-t border-slate-100 pt-3">
            <h3 className="text-sm font-semibold text-slate-500 flex items-center gap-1.5 mb-2">
              <ScrollText className="h-3.5 w-3.5 text-teal-500" />
              PRIMARY NATURE
            </h3>
            <Badge className="bg-teal-50 hover:bg-teal-50 text-teal-700 border-teal-100">
              {primaryNature}
            </Badge>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 pb-4">
        <Button
          variant="outline"
          className="w-full gap-1 text-sm border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800 transition-colors group relative overflow-hidden"
        >
          <span className="relative z-10">View Details</span>
          <ChevronRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          <span className="absolute inset-0 w-0 bg-orange-100 transition-all duration-300 ease-out group-hover:w-full"></span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CharacterCard;
