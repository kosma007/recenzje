export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-white leading-relaxed">

      <h1 className="text-3xl font-bold mb-8">
        📄 Polityka prywatności
      </h1>

      <div className="space-y-8 text-gray-300">

        {/* 1 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            1. Informacje ogólne
          </h2>
          <p>
            Niniejsza strona internetowa ma charakter informacyjny i prezentuje
            treści dotyczące gier komputerowych, w tym recenzje, oceny oraz
            materiały zewnętrzne (np. YouTube, Steam).
          </p>
          <p className="mt-2">
            Administratorem strony jest operator serwisu LudosRatings.pl.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            2. Zakres zbieranych danych
          </h2>
          <p>
            Strona nie wymaga zakładania konta ani podawania danych osobowych
            w celu korzystania z jej funkcji.
          </p>

          <p className="mt-2">
            W sposób automatyczny mogą być zbierane dane techniczne, takie jak:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>adres IP (w logach serwera lub hostingu)</li>
            <li>informacje o przeglądarce i systemie operacyjnym</li>
            <li>czas i data wizyty</li>
            <li>odwiedzane podstrony</li>
          </ul>

          <p className="mt-2">
            Dane te nie są wykorzystywane do identyfikacji użytkownika.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            3. Cookies (pliki cookies)
          </h2>
          <p>
            Strona może wykorzystywać pliki cookies w celach:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>prawidłowego działania serwisu</li>
            <li>statystyk odwiedzin (np. Google Analytics lub podobne narzędzia)</li>
            <li>optymalizacji działania strony</li>
          </ul>

          <p className="mt-2">
            Użytkownik może w każdej chwili wyłączyć cookies w ustawieniach przeglądarki.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            4. Narzędzia i usługi zewnętrzne
          </h2>
          <p>
            Strona korzysta z zewnętrznych źródeł danych:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Steam Web API – dane o grach (opis, cena, obrazki, statystyki)</li>
            <li>YouTube – linki do materiałów wideo i recenzji</li>
          </ul>

          <p className="mt-2">
            Dane są pobierane wyłącznie w trybie odczytu i nie są modyfikowane.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            5. Brak rejestracji i kont użytkowników
          </h2>
          <p>
            Serwis nie umożliwia zakładania kont, logowania ani publikowania
            treści przez użytkowników. W związku z tym nie przetwarza danych
            osobowych użytkowników w tym zakresie.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            6. Odpowiedzialność za treści
          </h2>
          <p>
            Wszystkie oceny, cytaty i opinie prezentowane na stronie pochodzą
            z zewnętrznych źródeł (np. YouTube) i mają charakter informacyjny.
          </p>

          <p className="mt-2">
            Administrator serwisu nie odpowiada za treść materiałów publikowanych
            przez osoby trzecie.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            7. Przechowywanie danych
          </h2>
          <p>
            Strona nie przechowuje danych osobowych użytkowników w bazie danych.
            Ewentualne dane techniczne są przechowywane przez dostawcę hostingu
            zgodnie z jego polityką prywatności.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            8. Prawa użytkownika (RODO)
          </h2>
          <p>
            Jeżeli w przyszłości zakres przetwarzania danych ulegnie zmianie,
            użytkownik będzie miał prawo do:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>dostępu do swoich danych</li>
            <li>ich sprostowania lub usunięcia</li>
            <li>ograniczenia przetwarzania</li>
          </ul>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            9. Zmiany polityki prywatności
          </h2>
          <p>
            Polityka prywatności może być aktualizowana w związku z rozwojem
            serwisu lub zmianami prawnymi.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            10. Kontakt
          </h2>
          <p>
            W sprawach dotyczących prywatności można skontaktować się poprzez:
          </p>

          <p className="mt-2 text-blue-400">
            kontakt@twojadomena.pl
          </p>
        </section>

        <p className="text-sm text-gray-500 pt-6">
          Ostatnia aktualizacja: 2026
        </p>

      </div>
    </div>
  );
}