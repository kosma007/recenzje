"use client";

import { useState } from "react";

export default function ReviewInfoBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full text-white px-4 py-3 flex justify-between items-start gap-4">
      <div className="text-sm leading-snug">
        <p className="font-semibold mb-1">
          Informacja o ocenach gier 
        </p>

        <p>
          Ta strona zbiera oceny gier z materiałów YouTuberów i innych źródeł.
          Traktuj je z dystansem — internet nie zawsze wie, co mówi, nawet jeśli mówi to bardzo pewnie.
        </p>

        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>Oceny mogą być subiektywne i nie zawsze muszą odzwierciedlać Twoje doświadczenie.</li>
          <li>Strona jest w trakcie ciągłego rozwoju (tak, wiemy — jak każda „w 90% gotowa” aplikacja).</li>
          <li>Na bieżąco dodajemy nowe recenzje i materiały.</li>
          <li>Staramy się, aby każda ocena miała link do źródła, jeśli tylko się da.</li>
        </ul>

        <p className="mt-2 italic">
          Krótko mówiąc: pomagamy Ci wybierać gry, ale nie bierzemy odpowiedzialności za Twoje nocne „dlaczego to kupiłem?” 
        </p>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="text-red-500 font-bold hover:opacity-60 transition"
      >
        ✕
      </button>
    </div>
  );
}