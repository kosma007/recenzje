"use client";

import { useEffect, useState } from "react";
import reviewsData from "@/data/reviews.json";
import Image from "next/image";
import Link from "next/link";

type SteamData = {
  name: string;
  release_date: any;
  price: string;
  short_description: string;
  metacritic_score: number;
  header_image: string;
};

/* 🔥 RATING RING */
function RatingRing({ value }: { value: number }) {
  const radius = 18;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;

  const progress = (value / 10) * circumference;

  const color =
    value <= 5
      ? "#ef4444"
      : value < 8
      ? "#facc15"
      : "#22c55e";

  return (
    <svg height="48" width="48" className="absolute top-2 right-2">
      <circle
        stroke="#2a2a2a"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx="24"
        cy="24"
      />

      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        r={normalizedRadius}
        cx="24"
        cy="24"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        transform="rotate(-90 24 24)"
      />

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="10"
        fill="white"
        fontWeight="bold"
      >
        {value.toFixed(1)}
      </text>
    </svg>
  );
}

export default function Rodzic() {
  const [steamData, setSteamData] = useState<Record<number, SteamData>>({});

  useEffect(() => {
    const fetchAll = async () => {
      const results: Record<number, SteamData> = {};

      await Promise.all(
        reviewsData.map(async (game) => {
          try {
            const res = await fetch(
              `/api/steam-price?appid=${game.steamAppId}`
            );

            const data = await res.json();
            results[game.steamAppId] = data;
          } catch (err) {
            console.log("Steam error:", game.steamAppId);
          }
        })
      );

      setSteamData(results);
    };

    fetchAll();
  }, []);

  const sortedGames = [...reviewsData]
    .map((game) => {
      const steam = steamData[game.steamAppId];

      const date = steam?.release_date
        ? new Date(steam.release_date).getTime()
        : 0;

      return { ...game, _date: date };
    })
    .sort((a, b) => b._date - a._date)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Ostatnie gry
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {sortedGames.map((game) => {
          const steam = steamData[game.steamAppId] ?? null;

          const avg = game.reviews?.length
            ? game.reviews.reduce(
                (a, r) => a + r.score,
                0
              ) / game.reviews.length
            : 0;

          const imgSrc =
            steam?.header_image || game.image;

          const name =
            steam?.name || game.gamename;

          const desc =
            steam?.short_description ||
            game.shortDesc ||
            "Brak opisu";

          return (
            <div
              key={game.game}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:scale-[1.02] transition relative pb-10"
            >

              {/* IMAGE */}
              <div className="relative w-full h-40">
                <Image
                  src={imgSrc}
                  alt={name}
                  fill
                  className="object-cover"
                />

                <RatingRing value={avg} />
              </div>

              {/* CONTENT */}
              <div className="p-4">

                <h2 className="text-xl font-bold">
                  {name}
                </h2>

                <p className="text-gray-400 text-sm mt-1 line-clamp-3">
                  {desc}
                </p>

                <p className="mt-2 text-sm text-gray-300">
                  💰 {steam?.price || "Ładowanie..."}
                </p>

                <div className="w-full absolute bottom-0 left-0 flex justify-center">
                  <Link
                    href={`/recenzja/${game.game}`}
                    className="w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-sm font-semibold"
                  >
                    Zobacz recenzję
                  </Link>
                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}