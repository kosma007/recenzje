import Banner from "./components/home/banner";
import Rodzic from "./components/home/rodzic";
import RodzicOstatnieRecenzje from "./components/home/ostatnierecenzje";
import MostHated from "./components/home/mosthated";
import BestGames from "./components/home/bestgames";

export default function Page() {
  return (
    <div className="min-h-full max-w-6xl mx-auto flex flex-col">

      <Banner />

      <Rodzic />

      <RodzicOstatnieRecenzje />

      <MostHated />

      <BestGames />

    </div>
  );
}