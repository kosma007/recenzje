"use client";

import reviewsData from "@/data/reviews.json";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type SteamData = {
  name: string;
  short_description: string;
};

export default function RodzicMostHated() {
  const [steamData, setSteamData] = useState<Record<number, SteamData>>({});

  useEffect(() => {
    const fetchAll = async () => {
      const results: Record<number, SteamData> = {};

      for (const game of reviewsData) {
        try {
          const res = await fetch(
            `/api/steam-price?appid=${game.steamAppId}`
          );

          const data = await res.json();
          results[game.steamAppId] = data;
        } catch {
          console.log("Steam error:", game.steamAppId);
        }
      }

      setSteamData(results);
    };

    fetchAll();
  }, []);

  const gamesWithAvg = reviewsData.map((game) => {
    const avg = game.reviews?.length
      ? game.reviews.reduce((a, r) => a + r.score, 0) /
        game.reviews.length
      : 0;

    const steam = steamData[game.steamAppId] ?? null;

    const verticalCover = `https://steamcdn-a.akamaihd.net/steam/apps/${game.steamAppId}/library_600x900_2x.jpg`;

    return {
      ...game,
      avg,
      steam,
      name: steam?.name || game.gamename,
      desc: steam?.short_description || "Brak opisu",
      image: verticalCover,
    };
  });

  const worstGame = [...gamesWithAvg].sort((a, b) => a.avg - b.avg)[0];

  if (!worstGame) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 text-white mt-10">

      <h2 className="text-2xl font-bold mb-6">
        💀 Most Hated Game
      </h2>

      <div className="bg-zinc-900 border border-red-700 rounded-xl overflow-hidden hover:scale-[1.02] transition">

        {/* IMAGE */}
        <div className="relative w-full h-56">
          <Image
            src={worstGame.image}
            alt={worstGame.name}
            fill
            className="object-cover opacity-80"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6">

          <h3 className="text-2xl font-bold text-red-500">
            {worstGame.name}
          </h3>

          <p className="text-gray-400 mt-2">
            {worstGame.desc}
          </p>

          <p className="mt-3 text-lg">
            ⭐{" "}
            <span className="text-red-500 font-bold">
              {worstGame.avg.toFixed(1)}
            </span>
            /10
          </p>

          <Link
            href={`/recenzja/${worstGame.game}`}
            className="inline-block mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold"
          >
            Zobacz dlaczego jest nienawidzona →
          </Link>

        </div>
      </div>
    </div>
  );
}