"use client";

import reviewsData from "@/data/reviews.json";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StatystykiRodzic() {
  const games = reviewsData;

  const gameCount = games.length;

  const allReviews = games.flatMap((g) => g.reviews);
  const reviewCount = allReviews.length;

  const totalScore = allReviews.reduce((sum, r) => sum + r.score, 0);
  const avgScore = reviewCount ? (totalScore / reviewCount).toFixed(2) : "0";

  const chartData = [
    {
      name: "Pozytywne",
      value: allReviews.filter((r) => r.score >= 8).length,
    },
    {
      name: "Neutralne",
      value: allReviews.filter((r) => r.score >= 5 && r.score < 8).length,
    },
    {
      name: "Negatywne",
      value: allReviews.filter((r) => r.score < 5).length,
    },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="  text-white p-8">
      
     

      {/* KAFELKI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 ">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
          <p className="text-gray-400">Gry</p>
          <p className="text-3xl font-bold">{gameCount}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
          <p className="text-gray-400">Recenzje</p>
          <p className="text-3xl font-bold">{reviewCount}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
          <p className="text-gray-400">Średnia ocena</p>
          <p className="text-3xl font-bold text-green-400">{avgScore}</p>
        </div>

      </div>

      {/* WYKRES */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
        <h2 className="text-xl font-semibold mb-4">
         Rozkład ocen
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #333",
                  borderRadius: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}