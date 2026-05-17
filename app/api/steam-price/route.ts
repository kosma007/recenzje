export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const appid = searchParams.get("appid");

  if (!appid) {
    return Response.json({ error: "Brak appid" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://store.steampowered.com/api/appdetails?appids=${appid}&cc=pl&l=polish`,
      {
        next: { revalidate: 3600 }, // cache 1h 🔥
      }
    );

    const data = await res.json();

    const game = data[appid]?.data;

return Response.json({
  // 🎮 podstawowe info
  name: game?.name,
  type: game?.type,
  steam_appid: game?.steam_appid,

  // 📝 opisy
  short_description: game?.short_description,
  detailed_description: game?.detailed_description,
  about_the_game: game?.about_the_game,

  // 🖼️ grafiki
  header_image: game?.header_image,
  capsule_image: game?.capsule_image,
  capsule_imagev5: game?.capsule_imagev5,
  background: game?.background,
  background_raw: game?.background_raw,

  // 📸 screenshoty
  screenshots: game?.screenshots?.map((s: any) => s.path_full),

  // 🎥 trailery / video
  movies: game?.movies?.map((m: any) => ({
    name: m.name,
    thumbnail: m.thumbnail,
    webm: m.webm,
    mp4: m.mp4,
    highlight: m.highlight,
  })),

  // 💰 cena i promocje
  price: game?.price_overview?.final_formatted || "Free / brak ceny",
  initial_price: game?.price_overview?.initial_formatted,
  discount: game?.price_overview?.discount_percent || 0,
  currency: game?.price_overview?.currency,

  // ⭐ oceny i popularność
  metacritic_score: game?.metacritic?.score,
  metacritic_url: game?.metacritic?.url,
  recommendations: game?.recommendations?.total,

  // 🏷️ tagi / gatunki
  genres: game?.genres?.map((g: any) => g.description),
  categories: game?.categories?.map((c: any) => c.description),
  tags: game?.categories?.map((c: any) => c.description),

  // 🏢 twórcy
  developers: game?.developers,
  publishers: game?.publishers,

  // 📅 daty
  release_date: game?.release_date?.date,
  coming_soon: game?.release_date?.coming_soon,

  // 💻 wymagania sprzętowe
  pc_minimum: game?.pc_requirements?.minimum,
  pc_recommended: game?.pc_requirements?.recommended,

  mac_minimum: game?.mac_requirements?.minimum,
  linux_minimum: game?.linux_requirements?.minimum,

  // 🌍 języki
  supported_languages: game?.supported_languages,

  // 🔗 linki
  store_url: `https://store.steampowered.com/app/${game?.steam_appid}`,

  // 📊 dodatkowe
  achievements: game?.achievements?.total,
});
  } catch (e) {
    return Response.json({ error: "Błąd pobierania" }, { status: 500 });
  }
}