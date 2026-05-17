"use client";

import reviewsData from "@/data/reviews.json";
import Image from "next/image";
import Link from "next/link";

export default function RodzicOstatnieRecenzje() {
  // 🔥 spłaszczamy recenzje
  const latestReviews = reviewsData
    .flatMap((game) =>
      game.reviews.map((rev) => ({
        ...rev,
        gameName: game.gamename,
        gameSlug: game.game,
        gameImage: game.image,
        cytat: "cytat" in rev ? rev.cytat : undefined,
      }))
    )
    .slice(-3) // 👈 ostatnie 3
    .reverse(); // żeby najnowsze były pierwsze

  return (
    <div className="max-w-6xl mx-auto p-6 text-white mt-10">

      <h2 className="text-2xl font-bold mb-6">
        🎬 Ostatnie recenzje YouTuberów
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {latestReviews.map((rev, i) => (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:scale-[1.02] transition"
          >

            {/* GAME */}
            <div className="flex items-center gap-3 mb-3">

              <Image
                src={rev.gameImage}
                alt={rev.gameName}
                width={40}
                height={40}
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

            {/* CYTAT */}
            <p className="text-gray-300 italic text-sm mb-3">
              “{rev.cytat || "Brak cytatu"}”
            </p>

            {/* LINK */}
            <Link
              href={`/recenzja/${rev.gameSlug}`}
              className="text-blue-500 text-sm hover:underline"
            >
              Zobacz wszystkie recenzje →
            </Link>

          </div>
        ))}

      </div>
    </div>
  );
}