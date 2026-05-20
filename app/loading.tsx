export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">

      <div className="max-w-6xl mx-auto p-6 animate-pulse">

        {/* BANNER SKELETON */}
        <div className="w-full h-64 bg-zinc-800 rounded-xl mb-10" />

        {/* SEKCJA 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
            >
              <div className="w-full h-40 bg-zinc-800" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-zinc-800 rounded w-3/4" />
                <div className="h-4 bg-zinc-800 rounded w-full" />
                <div className="h-4 bg-zinc-800 rounded w-5/6" />
              </div>
            </div>
          ))}

        </div>

        {/* SEKCJA 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
            >
              <div className="w-full h-40 bg-zinc-800" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-zinc-800 rounded w-2/3" />
                <div className="h-4 bg-zinc-800 rounded w-full" />
              </div>
            </div>
          ))}

        </div>

        {/* SEKCJA 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-xl h-40"
            />
          ))}

        </div>

      </div>
    </div>
  );
}