"use client";

import { useEffect, useState } from "react";
import reviewsData from "@/data/reviews.json";
import Image from "next/image";
import Link from "next/link";

type Game = {
  reviews: any;
  game: string;
  gamename: string;
  image: string;
  steamAppId: number;
  shortDesc: string;
  shopLink: string;
  tags: string[];
};

type SteamData = {
  name: string;
  short_description: string;
  header_image: string;
  genres?: string[];
  categories?: string[];
};

export default function Rodzic() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [steamData, setSteamData] = useState<Record<number, SteamData>>({});

  useEffect(() => {
    const fetchData = async () => {
      const enriched: Game[] = [];
      const steamResults: Record<number, SteamData> = {};

      for (const g of reviewsData) {
        try {
          const res = await fetch(`/api/steam-price?appid=${g.steamAppId}`);
          const data = await res.json();

          steamResults[g.steamAppId] = data;

          const tags = [
            ...(data.genres || []),
            ...(data.categories || []),
          ];

          enriched.push({
            ...g,
            tags,
          });
        } catch {
          enriched.push({
            ...g,
            tags: [],
          });
        }
      }

      setGames(enriched);
      setSteamData(steamResults);

      const tagSet = new Set<string>();
      enriched.forEach((g) =>
        g.tags.forEach((t) => tagSet.add(t))
      );

      setAllTags([...tagSet].sort());
    };

    fetchData();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const filteredGames =
    selectedTags.length === 0
      ? games
      : games.filter((game) =>
          selectedTags.every((tag) =>
            game.tags.includes(tag)
          )
        );

  return (
    <div className="max-w-6xl mx-auto p-6 text-white  grid-cols-1 md:grid-cols-4 gap-6">

      {/* 🧠 TAGI */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl h-fit">
        <h2 className="text-lg font-bold mb-3">
          Tagi:
        </h2>

        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 text-sm rounded-full border transition
                ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 border-blue-500"
                    : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 🎯 LISTA GIER */}
      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">

        {filteredGames.map((game) => {

          const steam = steamData[game.steamAppId];

          const name =
            steam?.name || game.gamename;

          const desc =
            steam?.short_description || game.shortDesc;

          const img =
            steam?.header_image || game.image;

          return (
            <Link
              key={game.game}
              href={`/recenzja/${game.game}`}
            >
              <div
                className="h-full flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:scale-[1.02] transition"
              >

                {/* IMAGE */}
                <div className="relative w-full h-40 ">

                  <Image
                    src={img}
                    alt={name}
                    fill
                    className="object-cover"
                  />

                  {/* SCORE RING */}
                  {game.reviews && game.reviews.length > 0 && (() => {

                    const avg =
                      game.reviews.reduce(
                        (a: number, r: { score: number }) => a + r.score,
                        0
                      ) / game.reviews.length;

                    const percent = (avg / 10) * 100;

                    const color =
                      avg <= 5
                        ? "#ef4444"
                        : avg < 8
                        ? "#facc15"
                        : "#22c55e";

                    return (
                      <div className="absolute top-2 right-2 w-14 h-14">

                        <svg className="w-14 h-14" viewBox="0 0 36 36">

                          <path
                            d="M18 2.0845
                               a 15.9155 15.9155 0 0 1 0 31.831
                               a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#1f2937"
                            strokeWidth="3"
                          />

                          <path
                            d="M18 2.0845
                               a 15.9155 15.9155 0 0 1 0 31.831
                               a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={color}
                            strokeWidth="3"
                            strokeDasharray={`${percent}, 100`}
                            strokeLinecap="round"
                          />

                        </svg>

                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                          {avg.toFixed(1)}
                        </div>

                      </div>
                    );

                  })()}

                </div>

                <div className="p-4">

                  {/* NAME */}
                  <h3 className="text-lg font-bold">
                    {name}
                  </h3>

                  {/* SHORT DESC */}
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {desc}
                  </p>

                  {/* TAGS */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {game.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-zinc-800 px-2 py-1 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}