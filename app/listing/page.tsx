import Image from "next/image";
import Rodzic from "../components/listing/rodzic";


export default async function Page({
  params,
}: {
  params: Promise<{ gra: string }>;
}) {
  const { gra } = await params;

  console.log("PARAM GRA:", gra);

  return <Rodzic />;
}