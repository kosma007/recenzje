"use client";
import Image from "next/image";
import Link from "next/link";
import reviewsData from "@/data/reviews.json";
import { useEffect, useState } from "react";

type SteamData = {
  name: string;
  short_description: string;
};

export default function Top3Games() {
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

  const top3 = [...reviewsData]
    .map((game) => {
      const avg = game.reviews?.length
        ? game.reviews.reduce((a, r) => a + r.score, 0) /
          game.reviews.length
        : 0;

      const steam = steamData[game.steamAppId] ?? null;

      const verticalCover = `https://steamcdn-a.akamaihd.net/steam/apps/${game.steamAppId}/library_600x900_2x.jpg`;

      return {
        ...game,
        avg,
        name: steam?.name || game.gamename,
        desc: steam?.short_description || game.shortDesc,
        image: verticalCover,
      };
    })
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">

      <h2 className="text-2xl font-bold mb-6">
        🏆 TOP 3 najlepiej oceniane gry
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {top3.map((game, index) => (
          <div
            key={game.game}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:scale-[1.02] transition relative pb-10"
          >

            {/* RANK */}
            <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-yellow-500 text-black font-bold rounded">
              #{index + 1}
            </div>

            {/* IMAGE */}
            <div className="relative w-full h-44">
              <Image
                src={game.image}
                alt={game.name}
                fill
                className="object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">

              <h3 className="text-xl font-bold">
                {game.name}
              </h3>

              {/* SCORE */}
              <p className="mt-2 text-3xl font-bold">
                <span
                  className={
                    game.avg <= 5
                      ? "text-red-500"
                      : game.avg < 8
                      ? "text-yellow-400"
                      : "text-green-500"
                  }
                >
                  {game.avg.toFixed(1)}
                </span>
                <span className="text-white text-lg"> /10</span>
              </p>

              {/* DESC */}
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                {game.desc}
              </p>

              {/* BUTTON */}
              <div className="w-full absolute bottom-0 left-0 flex justify-center">
                <Link
                  href={`/recenzja/${game.game}`}
                  className="w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-sm font-semibold"
                >
                  Zobacz oceny
                </Link>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}