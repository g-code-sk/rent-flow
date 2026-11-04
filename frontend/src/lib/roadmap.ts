export type RoadmapColumnId = 'now' | 'next' | 'later'

export type RoadmapItem = {
   title: string
   detail: string
}

export type RoadmapColumn = {
   id: RoadmapColumnId
   label: string
   items: RoadmapItem[]
}

export const roadmapColumns: RoadmapColumn[] = [
   {
      id: 'now',
      label: 'Teraz',
      items: [
         {
            title: 'Kalkulačka čistého príjmu',
            detail: 'Mesačný nájom, katalóg výdavkov a porovnanie paušálu so skutočnými nákladmi.',
         },
         {
            title: 'Koncept v prehliadači',
            detail: 'Rozpracovaná kalkulácia sa ticho uloží lokálne - bez účtu.',
         },
      ],
   },
   {
      id: 'next',
      label: 'Ďalej',
      items: [
         {
            title: 'Účet a uložený scenár',
            detail: 'Prihlásenie a jeden uložený prípad, ktorý nezmizne s prehliadačom.',
         },
         {
            title: 'Evidencia k nehnuteľnosti',
            detail: 'Príjmy a výdavky počas roka, nielen jednorazový odhad.',
         },
         {
            title: 'Export pre účtovníka',
            detail: 'PDF alebo tlač so zhrnutím, verziou pravidiel a upozornením, že to nie je daňové poradenstvo.',
         },
      ],
   },
   {
      id: 'later',
      label: 'Neskôr',
      items: [
         {
            title: 'Ročné zhrnutie',
            detail: 'Podklady k daňovému priznaniu a export pre účtovníka.',
         },
         {
            title: 'Novinky e-mailom',
            detail: 'Krátke správy, keď pribudne funkcia - bez spamu.',
         },
         {
            title: 'Prístup pre účtovníka',
            detail: 'Zdieľanie čísel bez posielania tabuliek tam a späť.',
         },
      ],
   },
]
