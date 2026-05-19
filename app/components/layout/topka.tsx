'use client';

import { useState } from 'react';
import Link from 'next/link';
import reviewsData from '@/data/reviews.json';
import { useRouter } from 'next/navigation';

export default function TopMenu() {
  const [czyOtwarte, ustawOtwarte] = useState(false);
  const [query, setQuery] = useState('');

  const router = useRouter();

  const wyniki = reviewsData.filter((game) =>
    game.gamename.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (slug: string) => {
    setQuery('');
    ustawOtwarte(false);
    router.push(`/recenzja/${slug}`);
  };

  return (
    <nav className="w-full bg-[#18181B] text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* LOGO */}
        <div className="text-xl font-bold font-[Sora] tracking-[-0.3px] tracking-[-0.3px]">
          <Link href="/" >Ludos<span className="text-blue-500">Ratings</span>.pl</Link>
        </div>

        {/* SEARCH (DESKTOP) */}
        <div className="hidden md:flex relative w-full">
           <div className="text-md font-bold w-2/3 flex justify-center items-center">
            <div className="text-md font-bold w-1/3 flex justify-start items-center">
                      
                      </div>
                      <div className="text-md font-bold w-1/3 flex justify-start items-center">
                      <Link href="/kontakt">Kontakt</Link>
                      </div>
                       <div className="text-md font-bold w-1/3 flex justify-start items-center">
                      <Link href="/listing">Lista gier</Link>
                      </div>
        </div>
        
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj gry..."
            className="w-1/3 px-3 py-2 rounded-md bg-zinc-800 text-white outline-none"
          />

          {query && (
            <div className="absolute top-11 left-0 w-full bg-zinc-900 border border-zinc-700 rounded-md max-h-60 overflow-auto z-50">
              {wyniki.length > 0 ? (
                wyniki.map((game) => (
                  <div
                    key={game.game}
                    onClick={() => handleSelect(game.game)}
                    className="px-3 py-2 hover:bg-zinc-700 cursor-pointer text-sm"
                  >
                    {game.gamename}
                  </div>
                ))
              ) : (
                <p className="p-3 text-gray-400 text-sm">
                  Brak wyników
                </p>
              )}
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden"
          onClick={() => ustawOtwarte(!czyOtwarte)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {czyOtwarte && (
        <div className="md:hidden mt-4 flex flex-col gap-3">
 <div className="text-md font-bold w-full flex justify-start items-center">
         <Link href="/kontakt">Kontakt</Link>
        </div>
         <div className="text-md font-bold w-full flex justify-start items-center">
          <Link href="/listing">Lista gier</Link>
        </div>
          {/* SEARCH MOBILE */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj gry..."
            className="w-full px-3 py-2 rounded-md bg-zinc-800 text-white outline-none"
          />

          {query && (
            <div className="bg-zinc-900 border border-zinc-700 rounded-md">
              {wyniki.length > 0 ? (
                wyniki.map((game) => (
                  <div
                    key={game.game}
                    onClick={() => handleSelect(game.game)}
                    className="px-3 py-2 hover:bg-zinc-700 cursor-pointer text-sm"
                  >
                    {game.gamename}
                  </div>
                ))
              ) : (
                <p className="p-3 text-gray-400 text-sm">
                  Brak wyników
                </p>
              )}
            </div>
          )}

        </div>
      )}
    </nav>
  );
}