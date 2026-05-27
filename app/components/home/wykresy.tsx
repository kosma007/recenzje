"use client";

import reviewsData from "@/data/reviews.json";
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function StatystykiRodzic() {
  const games = reviewsData;

  const gameCount = games.length;

  const allReviews = games.flatMap((g) => g.reviews);
  const reviewCount = allReviews.length;

  const totalScore = allReviews.reduce((sum, r) => sum + r.score, 0);
  const avgScore = reviewCount ? (totalScore / reviewCount).toFixed(2) : "0";

  const total = reviewCount || 1;

  // 🎮 HUD DATA
  const chartData = [
    {
      name: "Pozytywne",
      value:
        (allReviews.filter((r) => r.score >= 8).length / total) * 100,
      fill: "#07ff62",
    },
    {
      name: "Neutralne",
      value:
        (allReviews.filter(
          (r) => r.score >= 5 && r.score < 8
        ).length /
          total) *
        100,
      fill: "#ffcc00",
    },
    {
      name: "Negatywne",
      value:
        (allReviews.filter((r) => r.score < 5).length / total) *
        100,
      fill: "#ff0000",
    },
  ];

  return (
    <div className="text-white p-8">

      {/* 🟦 KAFELKI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg bg-gradient-to-br from-black via-zinc-950 to-zinc-900 ">
          <p className="text-gray-400">Gry</p>
          <p className="text-3xl font-bold">{gameCount}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg bg-gradient-to-br from-black via-zinc-950 to-zinc-900 ">
          <p className="text-gray-400">Oceny</p>
          <p className="text-3xl font-bold">{reviewCount}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg bg-gradient-to-br from-black via-zinc-950 to-zinc-900 ">
          <p className="text-gray-400">Średnia ocena</p>
          <p className="text-3xl font-bold text-green-400">
            {avgScore}
          </p>
        </div>

      </div>

      {/* 🎮 RADIAL HUD CHART */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg relative bg-gradient-to-br from-black via-zinc-950 to-zinc-900 ">

        <h2 className="text-xl font-semibold mb-4">
          Rozkład ocen
        </h2>

        <div className="h-[300px] flex items-center justify-center relative">

          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="25%"
              outerRadius="100%"
              data={chartData}
              startAngle={180}
              endAngle={0}
            >

              <RadialBar
                dataKey="value"
                cornerRadius={10}
              />

              {/* 🔥 TOOLTIP FIX (czytelne nazwy) */}
           <Tooltip
  content={({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;

    return (
      <div className="bg-black/90 border border-white/10 p-3 rounded-lg text-white text-sm">
        <p className="font-semibold">{data.name}</p>
        <p className="text-zinc-300">
          {Number(data.value).toFixed(1)}%
        </p>
      </div>
    );
  }}
/>

              {/* 🧠 LEGENDA Z NAZWAMI */}
              <Legend
                formatter={(value, entry, index) =>
                  chartData[index]?.name
                }
              />

            </RadialBarChart>
          </ResponsiveContainer>

          {/* 🎯 CENTER HUD */}
          <div className="absolute text-center pointer-events-none">
            <p className="text-3xl font-bold text-white">
              {avgScore}
            </p>
            <p className="text-xs text-zinc-400">
              AVG SCORE
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}