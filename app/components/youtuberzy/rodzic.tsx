"use client";

import reviewsData from "@/data/reviews.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
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

  const map: Record<string, { scores: number[]; avatar?: string }> = {};

  games.forEach((game) => {
    game.reviews.forEach((r) => {
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
  });

  const youtubers = Object.entries(map).map(([name, data]) => {
    const scores = data.scores;

    const count = scores.length; // 🔥 zawsze INT
    const avg =
      count > 0
        ? scores.reduce((a, b) => a + b, 0) / count
        : 0;

    // 🔥 wizualne koszyki co 0.5 (bez psucia count)
    const distributionMap: Record<number, number> = {};

    scores.forEach((s) => {
      const rounded = Math.round(s * 2) / 2;
      distributionMap[rounded] = (distributionMap[rounded] || 0) + 1;
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
    <div className="min-h-screen max-w-6xl  text-white p-6 space-y-10">
      <h1 className="text-2xl font-bold">
       YouTuberzy – profile analityczne
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {youtubers.map((u) => (
          <div
            key={u.name}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          >
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-4">
              {u.avatar ? (
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="w-12 h-12 rounded-full object-cover border border-zinc-700"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-zinc-700" />
              )}

              <div>
                <h2 className="text-lg font-bold">{u.name}</h2>
                <p className="text-sm text-zinc-400">
                  gry: {u.count} | średnia: {u.avg}
                </p>
              </div>
            </div>

            {/* WYKRES */}
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={u.distribution}>
                  <XAxis dataKey="score" stroke="#aaa" />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111",
                      border: "1px solid #333",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="count" fill="#60a5fa" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}