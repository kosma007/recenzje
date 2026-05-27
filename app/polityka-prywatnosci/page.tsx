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
            2. Formularz kontaktowy i recenzji
          </h2>

          <p>
            Strona umożliwia użytkownikom wysłanie wiadomości poprzez formularz kontaktowy
            oraz przesłanie propozycji recenzji gier.
          </p>

          <p className="mt-2">
            W ramach tych formularzy mogą być zbierane następujące dane:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>adres e-mail</li>
            <li>imię lub pseudonim</li>
            <li>treść wiadomości</li>
            <li>dane przesłane w formularzu recenzji (np. tytuł gry, ocena, link do wideo, nazwa YouTubera)</li>
          </ul>

          <p className="mt-2">
            Dane te są wykorzystywane wyłącznie w celu kontaktu z użytkownikiem
            lub przetworzenia przesłanej recenzji.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            3. Podstawa prawna przetwarzania danych
          </h2>

          <p>
            Dane osobowe przetwarzane są na podstawie:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>art. 6 ust. 1 lit. a RODO – zgoda użytkownika</li>
            <li>art. 6 ust. 1 lit. f RODO – uzasadniony interes administratora (kontakt i obsługa zapytań)</li>
          </ul>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            4. Cookies (pliki cookies)
          </h2>
          <p>
            Strona może wykorzystywać pliki cookies w celach:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>prawidłowego działania serwisu</li>
            <li>statystyk odwiedzin</li>
            <li>optymalizacji działania strony</li>
          </ul>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            5. Narzędzia i usługi zewnętrzne
          </h2>

          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Steam Web API – dane o grach</li>
            <li>YouTube – materiały wideo</li>
          </ul>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            6. Przechowywanie danych
          </h2>

          <p>
            Dane przesłane przez formularze są przechowywane przez czas niezbędny
            do realizacji celu kontaktu lub obsługi zgłoszenia.
          </p>

          <p className="mt-2">
            Dane nie są sprzedawane ani udostępniane podmiotom trzecim.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            7. Prawa użytkownika (RODO)
          </h2>

          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>dostęp do danych</li>
            <li>sprostowanie danych</li>
            <li>usunięcie danych</li>
            <li>ograniczenie przetwarzania</li>
          </ul>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            8. Kontakt
          </h2>

          <p className="text-blue-400 mt-2">
            kontakt@ludosratings.pl
          </p>
        </section>

        <p className="text-sm text-gray-500 pt-6">
          Ostatnia aktualizacja: 2026
        </p>

      </div>
    </div>
  );
}