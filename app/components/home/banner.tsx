"use client";

import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="relative max-w-6xl h-[200px] lg:h-[430px] rounded-xl overflow-hidden border border-zinc-800 mb-8 mt-10 ">

      {/* BACKGROUND IMAGE */}
      <Image
        src="/banner2.png" // wrzuć swój obraz do /public
        alt="banner"
        fill
        className="object-fill lg:object-cover object-center"
        priority
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/10" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 text-white">

   



      </div>
    </div>
  );
}