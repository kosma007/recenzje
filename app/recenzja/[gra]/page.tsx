import Image from "next/image";
import Rodzic from "../../components/recenzja/rodzic";


export default async function Page({
  params,
}: {
  params: Promise<{ gra: string }>;
}) {
  const { gra } = await params;

  console.log("PARAM GRA:", gra);

  return <Rodzic gra={gra} />;
}