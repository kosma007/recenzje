import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#18181B] text-gray-300 mt-16 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* LEFT */}
        <div>
          <h2 className="text-white text-xl font-bold mb-3">
            LudosRatings.pl          </h2>
          <p className="text-sm text-gray-400">
            Platforma z recenzjami gier, ocenami youtuberów i danymi ze Steam.
          </p>
        </div>

        {/* CENTER */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Nawigacja
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                Strona główna
              </Link>
            </li>

            <li>
              <Link href="/regulamin" className="hover:text-white">
                Regulamin
              </Link>
            </li>
 <li>
              <Link href="/kontakt" className="hover:text-white">
                Kontakt
              </Link>
            </li>
            <li>
              <Link href="/polityka-prywatnosci" className="hover:text-white">
                Polityka prywatności
              </Link>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div>
          <h3 className="text-white font-semibold mb-3">
            Informacje
          </h3>

          <p className="text-sm text-gray-400">
            Dane o grach pochodzą z API Steam oraz publicznych źródeł YouTube.
          </p>

          <p className="text-xs text-gray-500 mt-4">
            © {new Date().getFullYear()} LudosRatings.pl          </p>
        </div>

      </div>
    </footer>
  );
}