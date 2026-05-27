"use client";

import { useState } from "react";

export default function KontaktPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [reviewForm, setReviewForm] = useState({
    gameTitle: "",
   videoLink: "",
      score: "",
      youtuber: "",
  });

  const [sent, setSent] = useState(false);
  const [reviewSent, setReviewSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

 const handleReviewSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    name: "REVIEW",
    email: "review@system.local",
    message: `${reviewForm.gameTitle} + ${reviewForm.videoLink} + ${reviewForm.score} + ${reviewForm.youtuber}`,
  };

  const res = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    setReviewSent(true);

    setReviewForm({
      gameTitle: "",
      videoLink: "",
      score: "",
      youtuber: "",
    });
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6 text-white space-y-12">

      {/* 📨 KONTAKT */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Kontakt</h1>

        <p className="text-gray-400 mb-8">
          Masz sugestię, błąd albo chcesz dodać grę? Napisz do nas.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-[#18181B] border border-zinc-800 rounded-xl p-6 space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Twoje imię"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-700 rounded-lg outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Twój email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-700 rounded-lg outline-none"
            required
          />

          <textarea
            name="message"
            placeholder="Wiadomość..."
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full p-3 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-700 rounded-lg outline-none resize-none"
            required
          />

          <button
            type="submit"
            className="px-5 py-3 border border-blue-500 hover:bg-blue-700 rounded-lg font-semibold transition"
          >
            Wyślij wiadomość
          </button>

          {sent && (
            <p className="text-green-400 mt-3">
              Wiadomość wysłana
            </p>
          )}
        </form>
      </div>

      {/* 🎮 DODAJ RECENZJĘ */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Dodaj recenzję gry
        </h2>

        <form
          onSubmit={handleReviewSubmit}
          className="bg-[#18181B] border border-zinc-800 rounded-xl p-6 space-y-4"
        >
          <input
            type="text"
            name="gameTitle"
            placeholder="Tytuł gry"
            value={reviewForm.gameTitle}
            onChange={handleReviewChange}
            className="w-full p-3 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-700 rounded-lg outline-none"
            required
          />

          <input
            type="text"
            name="videoLink"
            placeholder="Link do wideo"
            value={reviewForm.videoLink}
            onChange={handleReviewChange}
            className="w-full p-3 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-700 rounded-lg outline-none"
            required
          />

          <input
            type="number"
            name="score"
            placeholder="Ocena (0–10)"
            value={reviewForm.score}
            onChange={handleReviewChange}
            min={0}
            max={10}
            className="w-full p-3 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-700 rounded-lg outline-none"
            required
          />

          <input
            type="text"
            name="youtuber"
            placeholder="YouTuber"
            value={reviewForm.youtuber}
            onChange={handleReviewChange}
            className="w-full p-3 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-700 rounded-lg outline-none"
            required
          />

          <button
            type="submit"
            className="px-5 py-3 border border-green-500 hover:bg-green-700 rounded-lg font-semibold transition"
          >
            Dodaj recenzję
          </button>

          {reviewSent && (
            <p className="text-green-400 mt-3">
              Recenzja dodana
            </p>
          )}
        </form>
      </div>

      {/* INFO */}
      <div className="text-gray-400 text-sm">
        <p>
          📧 kontakt@ludosratings.pl
        </p>
        <p className="mt-2">
          🕒 Odpowiadamy 24–48h
        </p>
      </div>

    </div>
  );
}