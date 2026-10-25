# Data model (sketch)

Calculator and ledger share one model so Phase 1 does not get thrown away in Phase 2.

## Entities

### User

- id, email, password hash (or OAuth later)
- locale (default `sk`)
- created_at

### Property (Phase 1 minimal, Phase 2 full)

- id, user_id
- label (e.g. “Byt Bratislava”)
- address optional for MVP
- default lease hints: monthly_rent, currency (EUR)

### TaxProfile

- property_id (or user-level if one property)
- tax_year
- method: `FLAT` | `ACTUAL`
- rule_version: string (e.g. `sk-rental-2025.1`)

### Scenario (Phase 1 — saved calculator state)

- id, property_id, name
- snapshot JSON: lines + assumptions (vacancy_rate, etc.)
- created_at, updated_at

### IncomeLine

- id, property_id
- date, amount, currency
- period_start, period_end optional
- type: `RENT` (extend later)
- note
- source: `CALCULATOR` | `LEDGER`

### ExpenseLine

- id, property_id
- date, amount, currency
- category_id (FK to TaxExpenseCategory)
- deductibility: `YES` | `NO` | `PARTIAL`
- note
- attachment_id optional (Phase 2)
- source: `CALCULATOR` | `LEDGER`

### TaxExpenseCategory

- id, code (stable), label_sk, label_en optional
- deductible_actual: boolean
- sort_order
- rule_version (categories can differ by year)

### Attachment (Phase 2)

- id, user_id, storage_key, filename, mime, uploaded_at

## Computation (no DB — services)

```text
computeCashflow(lines, assumptions) → monthly + annual cash net
computeTaxableIncome(taxProfile, lines, rules) → taxable base, estimated tax, net after tax
projectYearToDate(lines, asOfDate) → YTD + run-rate forecast
```

All `rules` loaded by `rule_version` + `tax_year`.

## API shape (REST, indicative)

- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`
- `GET/POST /api/properties`
- `GET/POST /api/properties/:id/scenarios`
- `POST /api/calculate` (stateless OK for anonymous; optional save if authed)
- Phase 2: `GET/POST /api/properties/:id/income`, `.../expenses`
- Phase 3: `GET /api/properties/:id/reports/:year`
