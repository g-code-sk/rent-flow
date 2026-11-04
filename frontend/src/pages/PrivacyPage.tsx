export function PrivacyPage() {
   return (
      <div className="mx-auto w-full max-w-2xl">
         <p className="inline-flex items-center rounded-full border border-teal-900/15 bg-teal-900/5 px-3 py-1 text-xs font-medium tracking-wide text-teal-900">
            Ochrana údajov
         </p>
         <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Ako narábame s e-mailom</h1>
         <div className="mt-6 space-y-4 text-sm leading-relaxed text-stone-600">
            <p>Ak sa prihlásite na novinky, uložíme e-mail a zdroj prihlásenia (napr. kalkulačka). Použijeme ho len na krátke správy o RentFlow — nové funkcie ako uloženie scenára alebo export.</p>
            <p>E-mail nepredávame. Nápady môžete poslať aj bez e-mailu. Keď budeme posielať správy, pribudne aj odhlásenie.</p>
            <p className="text-xs text-stone-500">Toto nie je právny dokument — stručný popis, kým nemáme finálne podmienky.</p>
         </div>
      </div>
   )
}
