export enum ExpenseType {
   PERCENTAGE = 'percentage',
   MONTHLY = 'monthly',
   YEARLY = 'yearly',
   EXACT = 'exact',
}

export type Expense = {
   id: string
   nameSk: string
   descriptionSk: string
   notesSk: string
   defaultValue: number
   type: ExpenseType
   taxDeductible: boolean
   inputMin: number
   inputMax?: number
   inputStep: number
}

// Ideas for future expenses:
// - calculate based on m2 area
// - calculate based on number of tenants
// - switch between monthly and yearly expenses

export const expenses: Expense[] = [
   {
      id: 'vacancyReservePercent',
      nameSk: 'Rezerva na neobsadenosť',
      descriptionSk: 'Plánovaný výpadok nájomného medzi nájomcami a s tým spojené platenie fixných režijných nákladov.',
      notesSk: 'Bežne sa počítal výpadok 0.5 až 1 mesiac ročne (cca 4 % – 8 % z ročného nájomného).',
      defaultValue: 5,
      type: ExpenseType.PERCENTAGE,
      taxDeductible: false,
      inputMin: 0,
      inputMax: 100,
      inputStep: 0.01,
   },
   {
      id: 'capexReservePercent',
      nameSk: 'Rezerva na amortizáciu a obmenu (CapEx)',
      descriptionSk: 'Fond na obmenu spotrebičov, nábytku, sanity a maľovanie stien po opotrebení.',
      notesSk: 'Odporúča sa odkladať 5 % až 10 % z mesačného nájmu na budúce opravy a obmenu.',
      defaultValue: 6,
      type: ExpenseType.PERCENTAGE,
      taxDeductible: false,
      inputMin: 0,
      inputMax: 100,
      inputStep: 0.01,
   },
   {
      id: 'hoaBuildingFeeMonthly',
      nameSk: 'Mesačné zálohy správcovi / bytovému družstvu',
      descriptionSk: 'Zálohy za teplo, teplú/studenú vodu, výťah, osvetlenie a upratovanie spoločných priestorov.',
      notesSk: 'Udáva sa v presnej sume podľa predpisového listu od správcu.',
      defaultValue: 0,
      type: ExpenseType.MONTHLY,
      taxDeductible: true,
      inputMin: 0,
      inputStep: 1,
   },
   {
      id: 'repairFund',
      nameSk: 'Fond prevádzky, údržby a opráv (Fond opráv)',
      descriptionSk: 'Preddavok vlastníka do fondu na prevádzku, údržbu a opravy spoločných častí domu.',
      notesSk: 'Ak je už zahrnutý v zálohách správcovi, nechajte 0. Inak by sa odpočítal dvakrát.',
      defaultValue: 0,
      type: ExpenseType.MONTHLY,
      taxDeductible: true,
      inputMin: 0,
      inputStep: 1,
   },
   {
      id: 'electricity',
      nameSk: 'Elektrina',
      descriptionSk: 'Mesačné zálohové platby dodávateľovi elektriny.',
      notesSk: 'Ak je prepísaná priamo na nájomcu, v appke sa eviduje ako 0.',
      defaultValue: 100.0,
      type: ExpenseType.MONTHLY,
      taxDeductible: true,
      inputMin: 0,
      inputStep: 1,
   },
   {
      id: 'gas',
      nameSk: 'Plyn',
      descriptionSk: 'Mesačné zálohové platby dodávateľovi plynu.',
      notesSk: 'Ak je prepísaný priamo na nájomcu, v appke sa eviduje ako 0.',
      defaultValue: 0,
      type: ExpenseType.MONTHLY,
      taxDeductible: true,
      inputMin: 0,
      inputStep: 1,
   },
   {
      id: 'internet',
      nameSk: 'Internet',
      descriptionSk: 'Poplatky za internetové pripojenie v byte.',
      notesSk: 'Zvyčajne sa platí ako pevný balík alebo samostatná zmluva.',
      defaultValue: 30,
      type: ExpenseType.MONTHLY,
      taxDeductible: true,
      inputMin: 0,
      inputStep: 1,
   },
   {
      id: 'tv',
      nameSk: 'Televízia',
      descriptionSk: 'Poplatky za káblovú alebo satelitnú televíziu v byte.',
      notesSk: 'Zvyčajne sa platí ako pevný balík alebo samostatná zmluva.',
      defaultValue: 5.0,
      type: ExpenseType.MONTHLY,
      taxDeductible: true,
      inputMin: 0,
      inputStep: 1,
   },
   {
      id: 'propertyTax',
      nameSk: 'Daň z nehnuteľností',
      descriptionSk: 'Miestna daň za byt a podiel na pozemku platená obci/mestu.',
      notesSk: 'Závisí od lokality a rozlohy bytu.',
      defaultValue: 110,
      type: ExpenseType.YEARLY,
      taxDeductible: false,
      inputMin: 0,
      inputStep: 1,
   },
   {
      id: 'propertyInsurance',
      nameSk: 'Poistenie nehnuteľnosti a zodpovednosti',
      descriptionSk: 'Ročné poistenie stien, domácnosti a poistenie škôd spôsobených tretím osobám.',
      notesSk: 'Odporúča sa kombinovať poistenie bytu a poistenie zodpovednosti za škodu.',
      defaultValue: 160.0,
      type: ExpenseType.YEARLY,
      taxDeductible: false,
      inputMin: 0,
      inputStep: 1,
   },
   {
      id: 'applianceBoilerService',
      nameSk: 'Pravidelný servis a revízie',
      descriptionSk: 'Ročná revízia plynového kotla, servisy klimatizácie a kontrola komínov.',
      notesSk: 'Povinné pri vlastnom plynofikovateľnom vykurovaní.',
      defaultValue: 80.0,
      type: ExpenseType.YEARLY,
      taxDeductible: false,
      inputMin: 0,
      inputStep: 1,
   },
   {
      id: 'legalNotaryFees',
      nameSk: 'Právne a notárske poplatky',
      descriptionSk: 'Vypracovanie zmluvy advokátom, overenie podpisov, prípadne notárska zápisnica.',
      notesSk: 'Notárska zápisnica s exekučným titulom stojí cca 100 € – 200 €.',
      defaultValue: 0,
      type: ExpenseType.EXACT,
      taxDeductible: false,
      inputMin: 0,
      inputStep: 1,
   },
   {
      id: 'realtorCommission',
      nameSk: 'Provízia realitnej kancelárii',
      descriptionSk: 'Odmena realitnému maklérovi za nájdenie nájomcu a preverenie záujemcov.',
      notesSk: 'Zvyčajne vo výške 1 mesačného nájmu pri uzatvorení zmluvy.',
      defaultValue: 0.0,
      type: ExpenseType.EXACT,
      taxDeductible: false,
      inputMin: 0,
      inputStep: 1,
   },
]
