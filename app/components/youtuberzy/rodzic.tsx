"use client";

import reviewsData from "@/data/reviews.json";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Review = {
  youtuber: string;
  score: number;
  image?: string;
};

type Game = {
  reviews: Review[];
};

export default function YoutubersPage() {
  const games = reviewsData as Game[];

  const allReviews = games.flatMap((g) => g.reviews);

  const map: Record<string, { scores: number[]; avatar?: string }> = {};

  allReviews.forEach((r) => {
    if (!map[r.youtuber]) {
      map[r.youtuber] = {
        scores: [],
        avatar: r.image,
      };
    }

    map[r.youtuber].scores.push(r.score);

    if (!map[r.youtuber].avatar && r.image) {
      map[r.youtuber].avatar = r.image;
    }
  });

  const youtubers = Object.entries(map).map(([name, data]) => {
    const scores = data.scores;

    const count = scores.length;

    const avg =
      count > 0
        ? scores.reduce((a, b) => a + b, 0) / count
        : 0;

    const distributionMap: Record<number, number> = {};

    scores.forEach((s) => {
      const rounded = Math.round(s * 2) / 2;
      distributionMap[rounded] =
        (distributionMap[rounded] || 0) + 1;
    });

    const min = Math.min(...scores);
    const max = Math.max(...scores);

    const ticks = Array.from(
      { length: (max - min) * 2 + 1 },
      (_, i) => min + i * 0.5
    );

    const distribution = ticks.map((t) => ({
      score: t.toFixed(1),
      count: distributionMap[t] || 0,
    }));

    return {
      name,
      avatar: data.avatar,
      avg: Number(avg.toFixed(2)),
      count,
      distribution,
    };
  });

  return (
    <div className="min-h-screen  text-white p-8">

      <h1 className="text-3xl font-bold mb-8">
        YouTuber Analytics Dashboard
      </h1>

      {/* 🟦 GLOBALNE KARTY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl bg-gradient-to-br from-black via-zinc-950 to-zinc-900">
          <p className="text-zinc-400">YouTuberzy</p>
          <p className="text-3xl font-bold">{youtubers.length}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl bg-gradient-to-br from-black via-zinc-950 to-zinc-900">
          <p className="text-zinc-400">Recenzje</p>
          <p className="text-3xl font-bold">{allReviews.length}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl bg-gradient-to-br from-black via-zinc-950 to-zinc-900">
          <p className="text-zinc-400">Średnia globalna</p>
          <p className="text-3xl font-bold text-green-400">
            {(
              allReviews.reduce((a, b) => a + b.score, 0) /
              allReviews.length
            ).toFixed(2)}
          </p>
        </div>

      </div>

      {/* 📦 KARTY YOUTUBERÓW */}
      <div className="space-y-8">

        {youtubers.map((u) => (
          <div
            key={u.name}
            className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-6
              backdrop-blur-xl
              shadow-lg
              bg-gradient-to-br from-black via-zinc-950 to-zinc-900
            "
          >

            {/* HEADER */}
            <div className="flex items-center gap-4 mb-6 ">

              {u.avatar ? (
                <img
                  src={u.avatar}
                  className="w-14 h-14 rounded-full object-cover border border-zinc-700"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-zinc-700" />
              )}

              <div>
                <h2 className="text-xl font-bold">{u.name}</h2>
                <p className="text-sm text-zinc-400">
                  Profil analityczny
                </p>
              </div>

            </div>

            {/* 🟦 MINI KARTY STATYSTYK */}
            <div className="grid grid-cols-2 gap-4 mb-6 ">

              <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                <p className="text-zinc-400 text-sm">Recenzje</p>
                <p className="text-2xl font-bold">{u.count}</p>
              </div>

              <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                <p className="text-zinc-400 text-sm">Średnia</p>
                <p className="text-2xl font-bold text-green-400">
                  {u.avg}
                </p>
              </div>

            </div>

            {/* 📊 WYKRES */}
            <div className="h-[260px] bg-black/30 border border-white/10 rounded-xl p-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={u.distribution}>

                  <XAxis
                    dataKey="score"
                    stroke="#aaa"
                    tick={{ fill: "#aaa", fontSize: 12 }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111",
                      border: "1px solid #333",
                      borderRadius: "10px",
                    }}
                  />

                  <Bar
                    dataKey="count"
                    fill="#60a5fa"
                    radius={[6, 6, 0, 0]}
                  />

                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}