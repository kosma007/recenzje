import Banner from "./components/home/banner";
import Rodzic from "./components/home/rodzic";
import RodzicOstatnieRecenzje from "./components/home/ostatnierecenzje";
import MostHated from "./components/home/mosthated";
import BestGames from "./components/home/bestgames";
import Info from "./components/home/info";
import Wykresy from "./components/home/wykresy";

export default function Page() {
  return (
    <div className="min-h-full max-w-6xl mx-auto flex flex-col">
     
      <Banner />

      <Info />

      <Rodzic />

      <RodzicOstatnieRecenzje />
 
      <Wykresy />

          <BestGames />
      <MostHated />

  

    </div>
  );
}