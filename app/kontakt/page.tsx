"use client";

import { useState } from "react";

export default function KontaktPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
  return (
    <div className="max-w-3xl mx-auto p-6 text-white">

      <h1 className="text-3xl font-bold mb-2">
        Kontakt
      </h1>

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
          className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg outline-none"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Twój email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg outline-none"
          required
        />

        <textarea
          name="message"
          placeholder="Wiadomość..."
          value={form.message}
          onChange={handleChange}
          rows={5}
          className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg outline-none resize-none"
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

      {/* INFO */}
      <div className="mt-10 text-gray-400 text-sm">
        <p>
          📧 Email kontaktowy: <span className="text-white">kontakt@ludosratings.pl</span>
        </p>
        <p className="mt-2">
          🕒 Odpowiadamy zazwyczaj w ciągu 24–48h
        </p>
      </div>

    </div>
  );
}