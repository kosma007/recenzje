export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const appid = searchParams.get("appid");

  try {
    const res = await fetch(
      `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${appid}`
    );

    const data = await res.json();

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Fetch failed" }, { status: 500 });
  }
}