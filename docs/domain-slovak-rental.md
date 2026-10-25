# Domain — Slovak private long-term rental

Living document. **Validate with a daňový poradca** before treating outputs as authoritative. Link official sources in code comments where rules are implemented.

## Target user

- **Fyzická osoba** renting out **residential** property under a **long-term** lease
- Tenant pays monthly rent; utilities may be paid by tenant or landlord (product must support both)
- Not primary audience: commercial leases, accommodation services (ubytovacie služby), platform short-term

## Core user questions

1. **Cash:** How much money is left each month after rent and real costs?
2. **Tax:** What is taxable income under flat-rate vs actual expenses?
3. **Year-end:** What numbers and documents does my accountant need for DPFO?

## Tax logic (product responsibilities)

Implement as **pure functions** + **versioned rules** (e.g. `sk-rental-2025.1`):

| Concept | Product behavior |
|---------|------------------|
| Flat-rate expenses (paušálne výdavky) | Toggle; apply percentage/caps from rule module for the selected year |
| Actual expenses (skutočné výdavky) | Sum eligible expense lines by category |
| Income | Rent received (gross); handle vacancy as assumption in calculator, actuals in ledger |
| Non-deductible costs | Track for cashflow but exclude from tax base (e.g. principal loan repayments) |
| Improvements vs repairs | Flag large items; user/accountant resolves — do not auto-deduct ambiguous items |

### Expense categories (v1 taxonomy)

Oriented to Slovak landlord bookkeeping, not generic accounting:

- Správa / admin fee (správca, SVJ)
- Poistenie nehnuteľnosti
- Daň z nehnuteľností
- Údržba a opravy
- Energie / služby (if paid by landlord)
- Úroky z úveru (if applicable to tax logic for the chosen method)
- Provízia / sprostredkovanie
- Iné (with required note)

Each category maps to: **deductible under actual method** (yes/no/partial) per rule version.

## Calculator vs ledger

- **Same line-item shape** for income and expenses (see [data-model.md](./data-model.md))
- Calculator: assumptions (vacancy %, annual costs smoothed to monthly)
- Ledger: dated transactions; YTD drives “project to year-end”

## UX copy & compliance

- Default language: **Slovak**
- Every result screen: short disclaimer + link to “Metodika” page
- Exports: rule version ID, tax year, method selected, generation timestamp

## Open questions (resolve before Phase 1 coding)

- [ ] Default method in UI: flat-rate or actual (recommend: show both side-by-side)
- [ ] Mortgage: model interest-only for tax vs full installment for cashflow
- [ ] Co-ownership: defer to Phase 5 unless MVP users need it

## Sources to track (implementers)

Maintain a `references/` list in repo when coding starts:

- Zákon o dani z príjmov (relevant § for prenájom FO)
- Annual FS guidance / forms (DPFO attachments relevant to prenájom)
- Health/social: document when **not** in scope for passive rental MVP
