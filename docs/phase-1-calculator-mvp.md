# Phase 1 - Calculator MVP (product launch)

**Status:** In progress  
**Depends on:** [Phase 0](./phase-0-foundation.md)  
**Audience:** Private landlords, **long-term rent only** - this is the **MVP**.

## Goal

Answer: _“Koľko mi reálne ostane z prenájmu po nákladoch a dani?”_ - without requiring a spreadsheet.

Anonymous users can calculate; registered users can **save one property scenario** and export PDF.

## User stories

1. As a landlord, I enter monthly rent and recurring costs and see **cashflow** (mesiac / rok).
2. I compare **paušálne vs skutočné výdavky** and see estimated tax and **net after tax**.
3. I adjust rent, vacancy, or a major cost and see instant updated results.
4. I create an account and save my scenario as “Aktuálny nájomník”.
5. I export a summary for myself or my accountant (PDF or print).

## Build order

### 1. Tax rule module (backend-first)

- [ ] Package `packages/shared` or `packages/tax-sk`: `getRules(year, version)`
- [ ] Unit tests for flat vs actual on fixed fixtures
- [ ] `POST /api/calculate` - accepts property assumptions + lines, returns breakdown
- [ ] Response includes `rule_version`, `tax_year`, `method`

See [domain-slovak-rental.md](./domain-slovak-rental.md).

### 2. Calculator wizard (web)

Steps (can be one page with sections):

| Section                           | Fields                                                     |
| --------------------------------- | ---------------------------------------------------------- |
| Príjem                            | Monthly rent (EUR), optional vacancy %                     |
| Náklady (mesačné)                 | Správca, poistenie, energie (ak platím ja), iné            |
| Náklady (ročné → mesačný priemer) | Daň z nehnuteľností, opravy rezerva, …                     |
| Úver (cashflow)                   | Mesačná splátka split: úrok vs istina (istina nie do dane) |
| Daň                               | Rok, metóda výdavkov (prepínač + porovnanie)               |

Outputs:

- [x] Mesačný / ročný príjem a celkové náklady (cash) from the expense catalog
- [x] Základ dane + odhad dane for actual expenses (client-side, fixed 19 %)
- [x] **Čistý zisk po dani** (highlight)
- [x] Instant recalc as inputs change
- [ ] Mesačný / ročný hrubý príjem adjusted for a vacancy assumption (vacancy exists only as a catalog reserve line)
- [ ] Základ dane + odhad dane per method, from a versioned rule module
- [ ] Side-by-side ak obe metódy

### 3. Sensitivity / “what-if”

- [ ] Sliders or steppers: rent ±, vacancy, one-off expense
- [ ] No extra backend calls if client reuses same calculate payload (optional debounced API for consistency)

### 4. Auth + save scenario

- [x] Browser draft of the calculator (local, short-lived, not an account)
- [ ] One `Property` auto-created or explicit “Moja nehnuteľnosť”
- [ ] CRUD `Scenario` (name + JSON snapshot)
- [ ] Load scenario back into wizard

### 5. Export

- [x] Short disclaimer on the calculator result
- [ ] Print stylesheet or server PDF (pick one for MVP)
- [ ] Disclaimer + rule version + date on export

### 6. Public marketing shell (minimal)

- [x] Landing: value prop + link into the calculator
- [ ] `/metodika` static page: assumptions, disclaimer, link to domain doc summary (nav item is present and disabled)

## UX notes (long-term rent)

- Copy assumes **zmluva na dobu určitú/neurčitú**, mesačný nájom
- No nightly rates, no occupancy calendars
- Utilities: toggle “nájomník platí energie” vs landlord-paid lines

## Non-goals (Phase 1)

- Expense receipt upload
- Multiple properties
- Ledger / historical months
- DPFO form generation
- Airbnb, VAT, s.r.o.

## Metrics

- Wizard completion rate
- Export clicked
- Register after calculate (conversion)

## Exit criteria (MVP shipped)

- [ ] Live deploy (staging minimum)
- [x] Anonymous calculate works (in the browser; no `POST /api/calculate` yet)
- [ ] Register, save, reload scenario
- [ ] Export with disclaimer
- [ ] Tax tests green in CI
- [x] Slovak UI on all calculator strings

## Estimated effort

- Side project: ~2–4 weeks after Phase 0
- Full-time: ~1–2 weeks after Phase 0
