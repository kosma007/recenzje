"use client";

import reviewsData from "@/data/reviews.json";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Review = {
  videoLink: string;
  youtuber: string;
  image?: string;
  score: number;
  pros: string[];
  cons: string[];
  cytat: string;
};

type Game = {
  steamAppId: string | number;
  gamename: string;
  game: string;
  image: string;
  shortDesc: string;
  shopLink: string;
  reviews: Review[];
};

export default function Rodzic({ gra }: { gra: string }) {
  const game: Game | undefined = reviewsData.find(
    (g) => g.game === gra
  ) as Game | undefined;

  if (!game) {
    return (
      <div className="p-6 text-white">
        <h1 className="text-2xl font-bold">
          Nie znaleziono gry 😢
        </h1>
      </div>
    );
  }
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const startDrag = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;

    isDown.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const stopDrag = () => {
    isDown.current = false;
  };

  const moveDrag = (e: React.MouseEvent) => {
    if (!isDown.current || !sliderRef.current) return;

    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

 const [price, setPrice] = useState<string>("Ładowanie...");
 const [metacriticScore, setMetacriticScore] = useState<string>("Ładowanie...");
  const [developers, setDevelopers] = useState<number>(0);
  const [short_description, setShort_description] = useState<number>(0);
   const [pc_minimum, setPc_minimum] = useState<number>(0);
   const [pc_recommended, setPc_recommended] = useState<number>(0);
const [screenshots, setScreenshots] = useState<string[]>([]);
  useEffect(() => {
    fetch(`/api/steam-price?appid=${game.steamAppId}`)
      .then(res => res.json())
      .then(data => {
        setPrice(data.price);
        setMetacriticScore(data.metacritic_score);
        setDevelopers(data.developers);
        setShort_description(data.short_description);
        setPc_minimum(data.pc_minimum);
        setPc_recommended(data.pc_recommended);
   setScreenshots(data.screenshots || []);
      });
  }, []);

  
  const avgScore =
    game.reviews.reduce((acc, r) => acc + r.score, 0) /
    game.reviews.length;

  return (
    <div className="max-w-6xl mx-auto p-6 text-white mt-5">
      
        <div className="w-full  lg:h-[300px] rounded-lg lg:flex">
            <div className="w-full lg:w-1/4 relative h-full flex justify-start max-lg:justify-center max-lg:items-center">
        <Image
            src={game.image}
          alt={game.game}
            width={200}
          height={200}
          className="object-cover"
        />
        </div>
        <div className="w-full lg:w-2/4 relative h-full flex items-start justify-start ">
        <div className="text-left max-lg:text-center max-lg:mt-5">
            <h1 className="text-4xl font-bold mb-2">
        {game.gamename}
      </h1>
       <p className="text-lg text-gray-300"><span className="font-bold mb-5">{developers}</span></p> 
          <p className="text-lg text-gray-300">
            {short_description}
          </p>
          <Link
  href={game.shopLink}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block mt-4 px-5 py-3 border-2 border-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
>
  🛒 Zobacz w sklepie
</Link>


          </div>
          
        </div>
         

            <div className="lg:w-1/4 relative h-full flex items-center justify-center ">
              <span
    className={
      (avgScore <= 5
        ? "text-red-500 font-bold"
        : avgScore <= 8
        ? "text-yellow-400 font-bold"
        : "text-green-500 font-bold") + " text-[92px]"
    }
  >
    {avgScore.toFixed(1)}
  </span>
    <span className="font-bold text-white mt-[20%]">/10</span>
  </div>
      </div>
 <div className="w-full my-10">
      <div className="w-full h-px bg-gray-700 mb-6" />

      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing"
        
        onMouseDown={startDrag}
        onMouseLeave={stopDrag}
        onMouseUp={stopDrag}
        onMouseMove={moveDrag}
      >
        {screenshots.map((src, i) => (
          <div
            key={i}
            className="relative min-w-[80%] md:min-w-[33%] h-48 snap-center shrink-0"
          >
            <Image
            draggable={false}
              src={src}
              alt={`screenshot-${i}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>

<div className="lg:flex max-lg:text-center w-full">
      <div className="mt-5 lg:w-1/4">
        Cena z Steama: <span className="font-bold">{price}</span>
  
      </div>
       <div className="mt-5 lg:w-2/4">
  
      </div>
       <div className="mt-5 lg:w-1/4">
      {}
      </div>
</div>
  

      {/* LISTA RECENZJI */}
      <div className="space-y-4 mt-20">
        {game.reviews.map((rev, i) => (
          <div
            key={i}
            className="bg-[#18181B] lg:flex items-center border border-gray-800 rounded-xl p-5 "
          >
            {/* YOUTUBER HEADER */}
            <div className="flex items-center gap-4 mb-3 w-full lg:w-1/3">
              
              <Image
                src={rev.image ?? "/default-avatar.png"}
                alt={rev.youtuber}
                width={248}
                height={248}
                className="rounded-full object-cover border border-zinc-200 w-24 h-24"
              />
<div>
              <h2 className="text-xl font-semibold">
                {rev.youtuber}
              </h2>
              <Link
  href={rev.videoLink}
  target="_blank"
  className="inline-block mt-3 px-4 py-2 border border-red-500 hover:bg-red-700 transition rounded-lg text-white font-semibold"
>
  Zobacz recenzję
</Link>
  </div>
            </div>

         

            {/* PLUSY */}
            <div className="flex gap-10 w-full lg:w-2/3">
              <p className="text-gray-200 italic text-lg leading-relaxed max-lg:text-center max-lg:mt-5">
        “{rev.cytat}”
      </p>

</div>
   {/* SCORE */}
         <p className="text-lg mb-3 max-lg:text-center">
  <span
    className={
      (rev.score <= 5
        ? "text-red-500 font-bold"
        : rev.score <= 8
        ? "text-yellow-400 font-bold"
        : "text-green-500 font-bold") + " text-[42px]"
    }
  >
    {rev.score}
  </span>
  <span className="font-bold text-white">/10</span>
</p>

          </div>
        ))}
      </div>
      <div className="mt-20 lg:flex lg:gap-10">
       <div  dangerouslySetInnerHTML={{ __html: pc_minimum }} className="mt-5 lg:w-1/2">

      </div>
      <div  dangerouslySetInnerHTML={{ __html: pc_recommended }} className="mt-5 lg:w-1/2">

      </div>
        </div>
    </div>
    
  );
}