export type RoadmapStatus = 'in-progress' | 'planned'

export type RoadmapItem = {
   title: string
   detail: string
   done: boolean
}

export type RoadmapPhase = {
   id: string
   label: string
   status: RoadmapStatus
   statusLabel: string
   items: RoadmapItem[]
}

export const roadmapPhases: RoadmapPhase[] = [
   {
      id: 'calculator',
      label: 'Kalkulačka',
      status: 'in-progress',
      statusLabel: 'Rozpracované',
      items: [
         {
            title: 'Čistý príjem zo skutočných výdavkov',
            detail: 'Mesačný nájom, katalóg výdavkov, daňovo uznateľné položky a odhad dane.',
            done: true,
         },
         {
            title: 'Koncept v prehliadači',
            detail: 'Rozpracovaná kalkulácia sa dočasne uloží lokálne - bez účtu.',
            done: true,
         },
         {
            title: 'Novinky a spätná väzba',
            detail: 'Prihlásenie na krátke správy a miesto, kam napísať, čo chýba.',
            done: true,
         },
         {
            title: 'Paušál vs. skutočné výdavky',
            detail: 'Porovnanie oboch metód na rovnakých číslach.',
            done: false,
         },
         {
            title: 'Účet a uložený scenár',
            detail: 'Prihlásenie a jeden uložený prípad, ktorý nezmizne s prehliadačom.',
            done: false,
         },
         {
            title: 'Úver',
            detail: 'Mesačná splátka rozdelená na úrok a istinu. Istina ostáva v cash-flow, nie v dani.',
            done: false,
         },
         {
            title: 'Export PDF',
            detail: 'Zhrnutie s upozornením, že to nie je daňové poradenstvo, a s verziou pravidiel.',
            done: false,
         },
         {
            title: 'Metodika',
            detail: 'Predpoklady výpočtu a odkiaľ berieme daňové pravidlá.',
            done: true,
         },
      ],
   },
   {
      id: 'ledger',
      label: 'Evidencia',
      status: 'planned',
      statusLabel: 'Plánované',
      items: [
         {
            title: 'Príjmy a výdavky počas roka',
            detail: 'Záznam nájmu a nákladov, nielen jednorazový odhad.',
            done: false,
         },
         {
            title: 'Prehľad za rok',
            detail: 'Príjem, výdavky a odhad dane k dnešnému dňu, plus projekcia do decembra.',
            done: false,
         },
         {
            title: 'Upozornenia',
            detail: 'Chýbajúci mesiac nájmu alebo výdavok bez kategórie.',
            done: false,
         },
         {
            title: 'Prílohy k výdavkom',
            detail: 'Bločky a faktúry pri položke.',
            done: false,
         },
      ],
   },
   {
      id: 'year-close',
      label: 'Ročné zhrnutie',
      status: 'planned',
      statusLabel: 'Plánované',
      items: [
         {
            title: 'Uzávierka roka',
            detail: 'Príjmy, výdavky, základ dane a odhad dane podľa zvolenej metódy.',
            done: false,
         },
         {
            title: 'Kontrolný zoznam',
            detail: 'Čo pred exportom ešte chýba.',
            done: false,
         },
         {
            title: 'Export pre účtovníka',
            detail: 'PDF so zhrnutím a CSV s jednotlivými položkami.',
            done: false,
         },
      ],
   },
   {
      id: 'later',
      label: 'Neskôr',
      status: 'planned',
      statusLabel: 'Plánované',
      items: [
         {
            title: 'Pripomienka pred termínom',
            detail: 'Správa pred lehotou na daňové priznanie.',
            done: false,
         },
         {
            title: 'Prístup pre účtovníka',
            detail: 'Odkaz len na čítanie, bez posielania tabuliek.',
            done: false,
         },
         {
            title: 'Viac nehnuteľností',
            detail: 'Viac bytov v jednom účte.',
            done: false,
         },
         {
            title: 'Import z banky',
            detail: 'Návrh kategórií z výpisu. Nič sa neuloží bez potvrdenia.',
            done: false,
         },
         {
            title: 'Zmluva a termíny',
            detail: 'Koniec nájmu, výpoveď a indexácia.',
            done: false,
         },
         {
            title: 'Anglické rozhranie',
            detail: 'Pre prenajímateľov, ktorým slovenčina nie je prvá.',
            done: false,
         },
      ],
   },
]
