export function PrivacyPage() {
   return (
      <div className="mx-auto w-full max-w-2xl">
         <p className="inline-flex items-center rounded-full border border-teal-900/15 bg-teal-900/5 px-3 py-1 text-xs font-medium tracking-wide text-teal-900">
            Ochrana údajov
         </p>
         <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Ochrana osobných údajov</h1>
         <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Tieto informácie popisujú, ako RentFlow spracúva osobné údaje. Platí pre webovú kalkulačku, prihlásenie na novinky a formulár nápadov.
         </p>
         <p className="mt-2 text-xs text-stone-500">Posledná aktualizácia: 4. november 2026</p>

         <div className="mt-10 space-y-8 text-sm leading-relaxed text-stone-600">
            <section>
               <h2 className="text-base font-semibold tracking-tight text-stone-900">Prevádzkovateľ</h2>
               <p className="mt-2">
                  Prevádzkovateľom osobných údajov je <span className="font-medium text-stone-800">G-Code s. r. o.</span> so sídlom:
               </p>
               <ul className="list-none pl-5 py-2">
                  <li>IČO: 55137857</li>
                  <li>DIČ: 2121890496</li>
                  <li>Kráľová nad Váhom 369</li>
                  <li>925 91 Kráľová nad Váhom</li>
                  <li>Email: gabriel.vadkerti.dev@gmail.com</li>
               </ul>
               <p className="mt-2">
                  Žiadosti o prístup, opravu, výmaz, obmedzenie spracúvania, prenosnosť, námietku alebo odvolanie súhlasu pošlite písomne na túto adresu sídla alebo
                  emailom.
               </p>
            </section>

            <section>
               <h2 className="text-base font-semibold tracking-tight text-stone-900">Aké údaje spracúvame</h2>
               <p className="mt-2">
                  Spracúvame len údaje, ktoré nám sami odošlete, a krátkodobé technické údaje potrebné na ochranu formulárov. Údaje nepredávame a nepoužívame ich na
                  reklamu.
               </p>
               <ul className="mt-3 list-disc space-y-3 pl-5">
                  <li>
                     <span className="font-medium text-stone-800">Novinky e-mailom.</span> Uložíme e-mailovú adresu (malými písmenami) a čas, kedy ste udelili súhlas.
                     Neukladáme, z ktorej stránky ste sa prihlásili. Účel: krátke správy o nových funkciách RentFlow. Právny základ: súhlas podľa čl. 6 ods. 1 písm. a)
                     GDPR, ktorý udeľujete zaškrtnutím políčka v formulári.
                  </li>
                  <li>
                     <span className="font-medium text-stone-800">Nápady.</span> Uložíme text správy a e-mail, len ak ho vyplníte. Účel: prečítať návrh a v prípade
                     e-mailu naň odpovedať. Právny základ: oprávnený záujem podľa čl. 6 ods. 1 písm. f) GDPR zlepšovať produkt. E-mail pri nápade je voliteľný.
                  </li>
                  <li>
                     <span className="font-medium text-stone-800">Kalkulačka.</span> Čísla nájmu a výdavkov zostávajú vo vašom prehliadači pod kľúčom{' '}
                     <code className="rounded bg-stone-100 px-1 py-0.5 text-xs text-stone-700">rentflow.calculator.draft</code> a po jednej hodine sa zahodia. Na server
                     ich neposielame a nikde inde ich neukladáme.
                  </li>
                  <li>
                     <span className="font-medium text-stone-800">Technické údaje.</span> IP adresu do databázy nezapisujeme. Na obmedzenie zneužitia formulárov ju držíme
                     v pamäti procesu najviac 15 minút. Poskytovateľ hostingu môže krátkodobo evidovať spojenia vo vlastných prevádzkových záznamoch.
                  </li>
               </ul>
               <p className="mt-3">
                  E-mail je potrebný len na prihlásenie k novinkám. Bez súhlasu a e-mailu vás na zoznam nezaradíme. Kalkulačku a nápad bez e-mailu môžete použiť aj tak.
               </p>
            </section>

            <section>
               <h2 className="text-base font-semibold tracking-tight text-stone-900">Ako dlho ich držíme</h2>
               <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>E-mail na novinky držíme, kým súhlas neodvoláte alebo kým rozosielanie noviniek neskončí. Potom ho vymažeme.</li>
                  <li>Nápad držíme, kým ho použijeme pri plánovaní alebo kým požiadate o výmaz, najdlhšie 24 mesiacov.</li>
                  <li>Koncept kalkulačky v prehliadači vyprší po jednej hodine. Môžete ho vymazať aj vymazaním údajov webu v prehliadači.</li>
               </ul>
            </section>

            <section>
               <h2 className="text-base font-semibold tracking-tight text-stone-900">Komu ich poskytujeme</h2>
               <p className="mt-2">
                  Aplikácia a databáza PostgreSQL bežia u sprostredkovateľa Render (Render Services, Inc.). Render spracúva údaje podľa našich pokynov na prevádzku
                  služby.
               </p>
               <p className="mt-2">
                  Ak je databáza umiestnená mimo EHP, prenos je pokrytý zmluvnými podmienkami o spracúvaní údajov a štandardnými zmluvnými doložkami, ktoré Render
                  používa.
               </p>
               <p className="mt-2">Údaje neposkytujeme iným tretím stranám na ich vlastné účely.</p>
            </section>

            <section>
               <h2 className="text-base font-semibold tracking-tight text-stone-900">Vaše práva</h2>
               <p className="mt-2">Máte právo:</p>
               <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>na prístup k osobným údajom, ich opravu a výmaz,</li>
                  <li>na obmedzenie spracúvania,</li>
                  <li>na prenosnosť e-mailu z prihlásenia na novinky,</li>
                  <li>namietať proti spracúvaniu nápadov na základe oprávneného záujmu,</li>
                  <li>kedykoľvek odvolať súhlas s novinkami, bez vplyvu na zákonnosť spracúvania pred odvolaním.</li>
               </ul>
               <p className="mt-3">
                  V aplikácii zatiaľ nie je odhlasovací odkaz. Súhlas odvoláte písomnou žiadosťou na adresu sídla alebo emailom. Po odvolaní e-mail zo zoznamu noviniek
                  vymažeme.
               </p>
               <p className="mt-2">
                  Máte právo podať sťažnosť Úradu na ochranu osobných údajov Slovenskej republiky, Hraničná 12, 820 07 Bratislava 27,{' '}
                  <a
                     href="https://dataprotection.gov.sk"
                     className="font-medium text-teal-900 underline decoration-teal-900/30 underline-offset-2 hover:decoration-teal-900"
                  >
                     dataprotection.gov.sk
                  </a>
                  .
               </p>
               <p className="mt-2">
                  Neprijímame rozhodnutia založené výlučne na automatizovanom spracúvaní, ktoré by mali právne účinky alebo vás obdobne významne ovplyvnili.
               </p>
            </section>

            <section>
               <h2 className="text-base font-semibold tracking-tight text-stone-900">Súbory cookie</h2>
               <p className="mt-2">
                  RentFlow neukladá súbory cookie, nespúšťa analytiku a nepoužíva reklamné značky. Koncept kalkulačky je v lokálnom úložisku prehliadača, nie v cookie.
               </p>
            </section>
         </div>
      </div>
   )
}
