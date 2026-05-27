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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          reviewsData.map(async (g) => {
            try {
              const res = await fetch(`/api/steam-price?appid=${g.steamAppId}`);
              const data = await res.json();

              const tags = [
                ...(data.genres || []),
                ...(data.categories || []),
              ];

              return {
                game: {
                  ...g,
                  tags,
                },
                steam: {
                  appId: g.steamAppId,
                  data,
                },
              };
            } catch {
              return {
                game: {
                  ...g,
                  tags: [],
                },
                steam: {
                  appId: g.steamAppId,
                  data: null,
                },
              };
            }
          })
        );

        const enrichedGames: Game[] = results.map((r) => r.game);

        const steamMap: Record<number, SteamData> = {};
        results.forEach((r) => {
          if (r.steam.data) {
            steamMap[r.steam.appId] = r.steam.data;
          }
        });

        setGames(enrichedGames);
        setSteamData(steamMap);

        const tagSet = new Set<string>();
        enrichedGames.forEach((g) =>
          g.tags.forEach((t) => tagSet.add(t))
        );

        setAllTags([...tagSet].sort());
      } catch (err) {
        console.error(err);
      }
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
          selectedTags.every((tag) => game.tags.includes(tag))
        );

  const getAvgScore = (game: Game) => {
    if (!game.reviews || game.reviews.length === 0) return 0;

    return (
      game.reviews.reduce(
        (a: number, r: { score: number }) => a + r.score,
        0
      ) / game.reviews.length
    );
  };

  const sortedGames = [...filteredGames].sort((a, b) => {
    const avgA = getAvgScore(a);
    const avgB = getAvgScore(b);

    return sortOrder === "asc" ? avgA - avgB : avgB - avgA;
  });

  const totalPages = Math.ceil(sortedGames.length / itemsPerPage);

  const paginatedGames = sortedGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTags, sortOrder]);

const getPages = () => {
  const pages: (number | string)[] = [];

  const start = Math.max(currentPage - 2, 2);
  const end = Math.min(currentPage + 2, totalPages - 1);

  // zawsze pierwsza strona
  pages.push(1);

  // lewy ...
  if (start > 2) {
    pages.push("...");
  }

  // środek
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // prawy ...
  if (end < totalPages - 1) {
    pages.push("...");
  }

  // zawsze ostatnia strona
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">

      {/* TAGI */}
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-800 p-4 rounded-xl mb-6">
        <h2 className="text-lg font-bold mb-3">Tagi:</h2>

        <div className="flex flex-wrap gap-2 ">
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

      {/* SORT */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() =>
            setSortOrder((p) => (p === "asc" ? "desc" : "asc"))
          }
          className="px-4 py-2 bg-zinc-800 border border-blue-700 hover:bg-blue-600 rounded"
        >
          Sortuj: {sortOrder === "asc" ? "rosnąco" : "malejąco"}
        </button>
      </div>

      {/* LISTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">

        {paginatedGames.map((game) => {
          const steam = steamData[game.steamAppId];

          const name = steam?.name || game.gamename;
          const desc = steam?.short_description || game.shortDesc;
          const img = steam?.header_image || game.image;

          return (
            <Link key={game.game} href={`/recenzja/${game.game}`}>
             <div className="h-full flex flex-col bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-800 rounded-xl overflow-hidden hover:scale-[1.02] transition">

               <div className="relative w-full h-40">

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
                  <h3 className="font-bold text-lg">{name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-2">{desc}</p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {game.tags.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs bg-zinc-800 px-2 py-1 rounded">
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

      {/* PAGINACJA */}
    <div className="flex justify-center mt-8 gap-2 flex-wrap">
  {getPages().map((page, i) =>
    page === "..." ? (
      <span key={i} className="px-3 py-1 text-gray-400">
        ...
      </span>
    ) : (
      <button
        key={i}
        onClick={() => setCurrentPage(page as number)}
        className={`px-3 py-1 rounded border transition
          ${
            currentPage === page
              ? "bg-blue-600 border-blue-500"
              : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
          }`}
      >
        {page}
      </button>
    )
  )}
</div>

    </div>
  );
}