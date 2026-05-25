import nodemailer from "nodemailer";

const ipCooldown = new Map<string, number>();

export async function POST(req: Request) {
  try {
    // IP usera (prosty rate limit)
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();
    const last = ipCooldown.get(ip) || 0;

    // 30 sekund anty-spam
    if (now - last < 1_000) {
      return Response.json(
        { ok: false, error: "Za często wysyłasz wiadomości 😏" },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 🕵️ honeypot (boty się tu wykładają)
    if (body.company) {
      return Response.json({ ok: false }, { status: 400 });
    }

    // 🔥 walidacja
    if (
      !body.name ||
      !body.email ||
      !body.message ||
      body.name.length > 100 ||
      body.email.length > 150 ||
      body.message.length > 2000
    ) {
      return Response.json(
        { ok: false, error: "Nieprawidłowe dane" },
        { status: 400 }
      );
    }

    // zapis cooldown
    ipCooldown.set(ip, now);

    // 📧 SMTP (Home.pl)
    const transporter = nodemailer.createTransport({
      host: "serwer2698645.hosting-home.pl",
      port: 587,
      secure: false,
      auth: {
        user: "kontakt@ludosratings.pl",
        pass: process.env.EMAIL_PASS as string,
      },
    });

    // wysyłka maila
    await transporter.sendMail({
      from: `"Kontakt form" <kontakt@ludosratings.pl>`,
      to: "kontakt@ludosratings.pl",
      subject: `Nowa wiadomość od ${body.name}`,
      text: `
Imię: ${body.name}
Email: ${body.email}

Wiadomość:
${body.message}
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);

    return Response.json(
      { ok: false, error: "Błąd serwera" },
      { status: 500 }
    );
  }
}