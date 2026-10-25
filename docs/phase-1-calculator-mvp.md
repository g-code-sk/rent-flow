# Phase 1 — Calculator MVP (product launch)

**Status:** Not started  
**Depends on:** [Phase 0](./phase-0-foundation.md)  
**Audience:** Private landlords, **long-term rent only** — this is the **MVP**.

## Goal

Answer: *“Koľko mi reálne ostane z prenájmu po nákladoch a dani?”* — without requiring a spreadsheet.

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
- [ ] `POST /api/calculate` — accepts property assumptions + lines, returns breakdown
- [ ] Response includes `rule_version`, `tax_year`, `method`

See [domain-slovak-rental.md](./domain-slovak-rental.md).

### 2. Calculator wizard (web)

Steps (can be one page with sections):

| Section | Fields |
|---------|--------|
| Príjem | Monthly rent (EUR), optional vacancy % |
| Náklady (mesačné) | Správca, poistenie, energie (ak platím ja), iné |
| Náklady (ročné → mesačný priemer) | Daň z nehnuteľností, opravy rezerva, … |
| Úver (cashflow) | Mesačná splátka split: úrok vs istina (istina nie do dane) |
| Daň | Rok, metóda výdavkov (prepínač + porovnanie) |

Outputs:

- Mesačný / ročný hrubý príjem (adjusted for vacancy)
- Celkové náklady (cash)
- Základ dane + odhad dane (per method)
- **Čistý zisk po dani** (highlight)
- Side-by-side ak obe metódy

### 3. Sensitivity / “what-if”

- [ ] Sliders or steppers: rent ±, vacancy, one-off expense
- [ ] No extra backend calls if client reuses same calculate payload (optional debounced API for consistency)

### 4. Auth + save scenario

- [ ] One `Property` auto-created or explicit “Moja nehnuteľnosť”
- [ ] CRUD `Scenario` (name + JSON snapshot)
- [ ] Load scenario back into wizard

### 5. Export

- [ ] Print stylesheet or server PDF (pick one for MVP)
- [ ] Disclaimer + rule version + date on export

### 6. Public marketing shell (minimal)

- [ ] Landing: value prop + “Spočítajte zdarma” → calculator
- [ ] `/metodika` static page: assumptions, disclaimer, link to domain doc summary

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
- [ ] Anonymous calculate works
- [ ] Register, save, reload scenario
- [ ] Export with disclaimer
- [ ] Tax tests green in CI
- [ ] Slovak UI on all calculator strings

## Estimated effort

- Side project: ~2–4 weeks after Phase 0
- Full-time: ~1–2 weeks after Phase 0
