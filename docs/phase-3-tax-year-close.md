# Phase 3 — Tax year close

**Status:** Not started  
**Depends on:** [Phase 2](./phase-2-properties-ledger.md)

## Goal

At year-end, produce a **trustworthy package** for DPFO preparation: totals, method used, anomalies flagged, exports for the user or accountant.

**Not** auto-submitting to Finančná správa in v1.

## User stories

1. I close tax year 2025 and see income, expenses, taxable base, estimated tax under my chosen method.
2. I see a checklist of issues (missing months, expenses without category).
3. I export PDF summary + CSV detail + optional ZIP of receipts.
4. I understand which **rule version** was used.

## Build order

### 1. Year lock / profile

- [ ] Select tax year on property
- [ ] Store `TaxProfile` for that year (method, rule_version)
- [ ] Document UX if user changes method after entries exist (warning + recalc)

### 2. Annual report generator

- [ ] Server-side report DTO: sections aligned to accountant expectations
  - Hrubé príjmy z prenájmu
  - Výdavky (breakdown by category)
  - Základ dane
  - Odhad dane (sadzba z rule module)
  - Nákladový vs daňový “čistý” prehľad
- [ ] Compare flat vs actual if user wants decision support (read-only second column)

### 3. Checklist engine

Rules examples (configurable):

- [ ] Fewer than N rent entries for calendar year
- [ ] Expenses &gt; X EUR without attachment (if attachments enabled)
- [ ] “Iné” category over threshold
- [ ] Negative cashflow months (informational)

### 4. Exports

- [ ] PDF: human-readable, disclaimer, rule version
- [ ] CSV: one row per income/expense line + summary sheet
- [ ] ZIP: receipts for year (if Phase 2 attachments)

### 5. Metodika page update

- [ ] Map report sections to “čo odovzdať účtovníkovi” checklist (generic, not form field numbers until validated)

## Form assistance (careful scope)

- [ ] **Line-item mapping suggestions** as help text, not pre-filled government XML
- [ ] Explicit “Toto nie je podanie daňového priznania”

Validate mapping labels with advisor before marketing “DPFO helper”.

## Non-goals

- Direct FS API / eDane integration
- Health/social insurance workflows unless domain doc expands
- Multi-country

## Exit criteria

- Golden-file test: fixture ledger → expected report totals
- Accountant review of one sample PDF (manual sign-off)
- User can complete checklist and export in &lt; 10 minutes

## Estimated effort

~3–4 weeks after Phase 2 stable.
