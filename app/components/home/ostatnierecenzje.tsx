"use client";

import reviewsData from "@/data/reviews.json";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type SteamData = {
  name: string;
  short_description: string;
  header_image: string;
};

export default function RodzicOstatnieRecenzje() {
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

  const latestReviews = reviewsData
    .flatMap((game) =>
      game.reviews.map((rev) => {
        const steam = steamData[game.steamAppId] ?? null;

        const avg = game.reviews?.length
          ? game.reviews.reduce((a, r) => a + r.score, 0) /
            game.reviews.length
          : 0;

       const verticalCover = `https://steamcdn-a.akamaihd.net/steam/apps/${game.steamAppId}/library_600x900_2x.jpg`;

const imgSrc = verticalCover;

        const name =
          steam?.name || game.gamename;

        const desc =
          steam?.short_description ||
          game.shortDesc ||
          "Brak opisu";

        return {
          ...rev,
          gameName: name,
          gameSlug: game.game,
          gameImage: imgSrc,
          gameDesc: desc,
          avgScore: avg,
        };
      })
    )
    .slice(0, 3);

  return (
    <div className="max-w-6xl p-6 text-white mt-10">
  

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {latestReviews.map((rev, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-800 rounded-xl p-4 hover:scale-[1.02] transition"
          >

            {/* GAME */}
            <div className="flex items-center gap-3 mb-3">

              <Image
                src={rev.gameImage}
                alt={rev.gameName}
                width={40}
                height={60}
                className="rounded-md object-cover"
              />

              <div>
                <p className="font-bold text-sm">
                  {rev.gameName}
                </p>

                <p className="text-gray-500 text-xs">
                  {rev.youtuber}
                </p>
              </div>
            </div>

            {/* SCORE */}
            <p className="mb-2">
              ⭐{" "}
              <span
                className={
                  rev.score <= 5
                    ? "text-red-500"
                    : rev.score < 8
                    ? "text-yellow-400"
                    : "text-green-500"
                }
              >
                {rev.score}
              </span>
              /10
            </p>

            {/* AVG */}
            <p className="text-xs text-gray-500 mb-2">
              Średnia: {rev.avgScore.toFixed(1)}
            </p>

            {/* CYTAT */}
            {/* <p className="text-gray-300 italic text-sm mb-3">
              {"cytat" in rev && rev.cytat ? `“${rev.cytat}”` : "Brak cytatu"}
            </p> */}

            {/* LINK */}
            <Link
              href={`/recenzja/${rev.gameSlug}`}
              className="text-blue-500 text-sm hover:underline"
            >
              Zobacz wszystkie oceny →
            </Link>

          </div>
        ))}

      </div>
    </div>
  );
}