# Rent-flow — product roadmap (docs)

Documentation for building **Rent-flow**: a SPA for **Slovak private landlords** who **long-term rent** residential property (typical nájom bytu / domu, not short-term platforms).

## MVP scope

| In scope (MVP) | Out of scope (later) |
|----------------|----------------------|
| Private individual landlords (FO) | Živnostník / s.r.o. portfolio tooling |
| Long-term leases (monthly rent) | Airbnb / Booking / short-term |
| Calculator + save scenario | Full electronic filing to Finančná správa |
| One property per user (expand in Phase 2) | VAT-heavy workflows |
| Slovak UI first | Bank API integrations |

**Tech stack:** Express, React, TypeScript, PostgreSQL (SPA + REST API).

**Trust principle:** Display **tax rule version** and **disclaimers** on every calculation and export. Rules change annually — encode them in a versioned domain module with unit tests.

## Phases (read in order)

| Phase | Doc | Goal |
|-------|-----|------|
| 0 | [phase-0-foundation.md](./phase-0-foundation.md) | Repo, API, DB, auth, shared validation |
| 1 | [phase-1-calculator-mvp.md](./phase-1-calculator-mvp.md) | **MVP launch:** net income calculator |
| 2 | [phase-2-properties-ledger.md](./phase-2-properties-ledger.md) | Track income & expenses |
| 3 | [phase-3-tax-year-close.md](./phase-3-tax-year-close.md) | Annual report & accountant export |
| 4 | [phase-4-retention-monetization.md](./phase-4-retention-monetization.md) | Reminders, tiers, accountant access |
| 5 | [phase-5-nice-to-haves.md](./phase-5-nice-to-haves.md) | Optional growth features |

## Cross-cutting references

- [domain-slovak-rental.md](./domain-slovak-rental.md) — assumptions, categories, legal disclaimers
- [data-model.md](./data-model.md) — entities shared by calculator and ledger

## Definition of “MVP shipped”

Phase 0 + Phase 1 complete:

- SK-localized long-term rent calculator (flat-rate vs actual expenses)
- Optional account: save one property scenario
- PDF/print export with disclaimer + rule version
- Deployed API + web

Phase 2+ are post-MVP unless you explicitly extend MVP scope.
