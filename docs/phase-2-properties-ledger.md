# Phase 2 — Properties & ledger

**Status:** Not started  
**Depends on:** [Phase 1](./phase-1-calculator-mvp.md)  
**MVP extension:** Post-MVP (unless you pull forward “track this month” before launch)

## Goal

Replace the landlord’s spreadsheet for the tax year: record **rent received** and **expenses**, see YTD dashboard, and feed the same tax engine as the calculator.

## User stories

1. I log each month’s rent when it hits my account.
2. I add expenses with Slovak-relevant categories and deductibility.
3. I see YTD cash vs estimated tax net on a dashboard.
4. I open the calculator pre-filled from YTD + “forecast to Dec”.
5. I get soft warnings (missing month, uncategorized expense).

## Build order

### 1. Property model (full)

- [ ] Edit property label, optional address
- [ ] Default monthly rent for quick “mark rent received” action
- [ ] **Multi-property** (same user) — enable if users ask; otherwise defer

### 2. Income CRUD

- [ ] List/filter by month/year
- [ ] Quick action: “Prijatý nájom — tento mesiac” (default amount from property)
- [ ] Edit date, amount, note, period

### 3. Expense CRUD

- [ ] Categories from `TaxExpenseCategory` (seed per rule version)
- [ ] Deductibility field (default from category, overridable with note)
- [ ] List/filter; monthly subtotals

### 4. Attachments (optional in early Phase 2)

- [ ] Upload PDF/image → object storage
- [ ] Link to expense line
- [ ] Size limits + virus scan later

### 5. Dashboard

- [ ] YTD: income, expenses (cash), estimated tax (from profile method)
- [ ] Chart: monthly income vs expenses (simple bar enough)
- [ ] Link to calculator: “Projekcia do konca roka”

### 6. Reconciliation hints

- [ ] Expected months with rent vs logged (12/12)
- [ ] Large expense → UI hint: repair vs improvement (no auto decision)

## Integration with Phase 1

- `IncomeLine` / `ExpenseLine` with `source: LEDGER`
- Calculator scenario can import YTD lines read-only snapshot
- Single `TaxProfile` per property per year (user picks method; warn if switching mid-year — document behavior)

## API (indicative)

- `GET/POST/PATCH/DELETE /api/properties/:id/income`
- `GET/POST/PATCH/DELETE /api/properties/:id/expenses`
- `GET /api/properties/:id/summary?year=2025`

## Non-goals

- Bank sync
- Tenant portal / rent collection
- Double-entry accounting

## Exit criteria

- Full year can be recorded without calculator-only mode
- Dashboard matches manual Excel for a test fixture year
- Import to calculator projection verified by test

## Estimated effort

~4–6 weeks side project after Phase 1.
