export default function Regulamin() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-white leading-relaxed">

      <h1 className="text-3xl font-bold mb-8">
        📜 Regulamin serwisu LudosRatings.pl      </h1>

      <div className="space-y-8 text-gray-300">

        {/* 1 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            1. Postanowienia ogólne
          </h2>
          <p>
            Niniejszy regulamin określa zasady korzystania z serwisu internetowego
            LudosRatings.pl, dostępnego pod adresem internetowym.
          </p>
          <p className="mt-2">
            Serwis ma charakter informacyjny i prezentuje recenzje gier oraz
            opinie pochodzące z zewnętrznych źródeł (np. YouTube).
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            2. Zakres usług
          </h2>
          <p>
            Serwis umożliwia:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>przeglądanie recenzji gier</li>
            <li>sprawdzanie ocen youtuberów</li>
            <li>wyświetlanie informacji o grach (Steam API)</li>
          </ul>

          <p className="mt-2">
            Serwis nie umożliwia rejestracji ani publikowania treści przez użytkowników.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            3. Charakter treści
          </h2>
          <p>
            Wszystkie oceny, cytaty i opinie prezentowane w serwisie pochodzą
            z zewnętrznych źródeł i mają charakter informacyjny.
          </p>

          <p className="mt-2">
            Administrator nie gwarantuje ich pełnej aktualności ani zgodności
            z opinią użytkownika.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            4. Odpowiedzialność
          </h2>
          <p>
            Administrator serwisu nie ponosi odpowiedzialności za treści
            publikowane przez osoby trzecie, w tym youtuberów oraz zewnętrzne
            platformy (np. Steam, YouTube).
          </p>

          <p className="mt-2">
            Serwis nie jest oficjalnie powiązany z żadnym producentem gier.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            5. Prawa autorskie
          </h2>
          <p>
            Wszystkie nazwy gier, logotypy oraz materiały graficzne należą
            do ich prawnych właścicieli.
          </p>

          <p className="mt-2">
            Serwis wykorzystuje je wyłącznie w celach informacyjnych i recenzenckich.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            6. Dane użytkowników
          </h2>
          <p>
            Serwis nie wymaga rejestracji i nie umożliwia tworzenia kont użytkowników.
          </p>

          <p className="mt-2">
            Nie są zbierane dane osobowe w ramach korzystania z podstawowych funkcji strony.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            7. Zewnętrzne źródła danych
          </h2>
          <p>
            Serwis korzysta z zewnętrznych API, w szczególności:
          </p>

          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Steam Web API</li>
            <li>YouTube (linki do materiałów wideo)</li>
          </ul>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            8. Zmiany w serwisie
          </h2>
          <p>
            Administrator zastrzega sobie prawo do zmiany funkcjonalności serwisu,
            jego wyglądu oraz treści bez wcześniejszego powiadomienia.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            9. Postanowienia końcowe
          </h2>
          <p>
            Korzystanie z serwisu oznacza akceptację niniejszego regulaminu.
          </p>
        </section>

        <p className="text-sm text-gray-500 pt-6">
          Ostatnia aktualizacja: 2026
        </p>

      </div>
    </div>
  );
}