import { PageEyebrow } from '@/components/ui/PageEyebrow'

export function MethodologyPage() {
   return (
      <div className="mx-auto w-full max-w-2xl">
         <PageEyebrow>Metodika</PageEyebrow>
         <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Ako počítame</h1>
         <p className="mt-3 text-sm leading-relaxed text-stone-600">
            Orientačný výpočet pre fyzickú osobu, ktorá dlhodobo prenajíma byt a neposkytuje ubytovacie služby. Číslo nie je daňové priznanie a nie je rada daňového
            poradcu. Platí pre pravidlá roka 2026 v tejto verzii kalkulačky.
         </p>
         <p className="mt-2 text-xs text-stone-500">Posledná aktualizácia: 7. november 2026</p>

         <div className="mt-10 space-y-8 text-sm leading-relaxed text-stone-600">
            <section>
               <h2 className="text-base font-semibold tracking-tight text-stone-900">Čo zadávate</h2>
               <p className="mt-2">Mesačný nájom sa násobí dvanástimi. Neobsadenosť nie je menej mesiacov prenájmu. Je to samostatná rezerva v eurách.</p>
               <p className="mt-2">
                  Ročný výdavok sa rozloží na dvanásť mesiacov. Jednorazový poplatok sa násobí počtom za rok a tiež sa rozloží. Percento sa berie z mesačného nájmu.
                  Energie, ktoré nájomca platí priamo dodávateľovi, zadajte ako 0.
               </p>
            </section>

            <section>
               <h2 className="text-base font-semibold tracking-tight text-stone-900">Dve sumy</h2>
               <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>
                     <span className="font-medium text-stone-800">Príjem pred daňou</span> je nájom mínus všetky výdavky, aj tie, ktoré daň neznižujú.
                  </li>
                  <li>
                     <span className="font-medium text-stone-800">Čistý príjem</span> je príjem pred daňou mínus odhad dane. To je zelené číslo v súhrne.
                  </li>
               </ul>
            </section>

            <section>
               <h2 className="text-base font-semibold tracking-tight text-stone-900">Ako vznikne daň</h2>
               <ol className="mt-3 list-decimal space-y-2 pl-5">
                  <li>Ročný nájom = mesačný nájom × 12.</li>
                  <li>Odpočíta sa oslobodenie 500 €, najviac však do výšky ročného nájmu.</li>
                  <li>
                     Krátené výdavky = daňovo uznateľné výdavky × (nájom − oslobodenie) / nájom. Pri nájme do 500 € je pomer 0, takže krátené výdavky sú 0 €.
                  </li>
                  <li>Základ dane = nájom − oslobodenie − krátené výdavky, najmenej 0 €.</li>
                  <li>Daň = základ × 19 %. Pri základe 0 € je daň 0 €.</li>
               </ol>
               <p className="mt-3">Zákon stratu z prenájmu nepripúšťa, preto základ dane ani daň neklesnú pod nulu. Príjem pred daňou záporný byť môže.</p>
            </section>

            <section>
               <h2 className="text-base font-semibold tracking-tight text-stone-900">Ktoré riadky znižujú daň</h2>
               <p className="mt-2">Počítame s tým, že byt nie je v obchodnom majetku. Podľa dnešného katalógu daň znižujú len tieto položky:</p>
               <ul className="mt-3 list-disc space-y-1 pl-5">
                  <li>zálohy správcovi alebo bytovému družstvu,</li>
                  <li>fond prevádzky, údržby a opráv, ak nie je už súčasťou týchto záloh,</li>
                  <li>elektrina, plyn, internet a televízia, ak ich platíte vy.</li>
               </ul>
               <p className="mt-3">Fond zadajte len raz. Ak je na predpise spolu so zálohami, patrí do jedného riadku.</p>
               <p className="mt-3">Len v hotovosti, bez vplyvu na daň, ostávajú:</p>
               <ul className="mt-3 list-disc space-y-1 pl-5">
                  <li>rezerva na neobsadenosť a rezerva na obmenu,</li>
                  <li>daň z nehnuteľností, poistenie a revízie,</li>
                  <li>notárske poplatky a provízia realitnej kancelárii.</li>
               </ul>
               <p className="mt-3">Rezervy nie sú doklady. Daň neznižujú.</p>
            </section>

            <section>
               <h2 className="text-base font-semibold tracking-tight text-stone-900">Čo v čísle nie je</h2>
               <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>Mzda a iné príjmy. 19 % nemusí byť sadzba vášho celého základu dane. Vyššie pásma kalkulačka nepoužíva.</li>
                  <li>Nezdaniteľná časť na daňovníka.</li>
                  <li>
                     Zdravotné a sociálne poistenie. Pri tomto type prenájmu spravidla nevznikajú a kalkulačka ich nepočíta. Nadpis v súhrne „Daň a odvody“ zatiaľ ukazuje
                     len daň.
                  </li>
                  <li>Hypotéka, paušálne výdavky, manželia, spoluvlastníctvo, viac bytov a odpisy.</li>
                  <li>To, či vôbec musíte podať daňové priznanie.</li>
               </ul>
            </section>

            <section>
               <h2 className="text-base font-semibold tracking-tight text-stone-900">Odkiaľ to je</h2>
               <p className="mt-2">
                  Zákon č. 595/2003 Z. z. o dani z príjmov: § 6 ods. 3 pre príjem z prenájmu, § 9 ods. 1 písm. g) pre oslobodenie 500 € a § 15 pre sadzbu. Znenie je v{' '}
                  <a
                     href="https://www.slov-lex.sk/ezbierky/pravne-predpisy/SK/ZZ/2003/595/"
                     className="font-medium text-teal-900 underline decoration-teal-900/30 underline-offset-2 hover:decoration-teal-900"
                  >
                     Zbierke zákonov
                  </a>
                  . Takto počíta táto verzia kalkulačky. Daňový poradca ju zatiaľ nekontroloval.
               </p>
            </section>
         </div>
      </div>
   )
}
