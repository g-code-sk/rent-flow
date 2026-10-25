# Phase 4 — Retention & monetization

**Status:** Not started  
**Depends on:** [Phase 3](./phase-3-tax-year-close.md) (or Phase 2 if you monetize ledger earlier)

## Goal

Keep landlords through the year and charge for value at **ledger + year-close** depth; reduce churn with timely reminders.

## User stories

1. I get reminded before DPFO deadline (and optional quarterly advance if you add that logic later).
2. I upgrade to Pro to attach receipts and generate annual export.
3. I share read-only access with my accountant for one tax year.
4. I manage two rental units in one account.

## Build order

### 1. Pricing & entitlements

Suggested tiers for long-term private landlords:

| Tier | Includes |
|------|----------|
| Free | Calculator, 1 saved scenario, basic PDF |
| Pro | Ledger, attachments, annual report export, multi-property |
| (Later) Accountant seat | Read-only link, no edit |

- [ ] `plan` on user or subscription table
- [ ] Middleware `requirePlan('pro')` on routes
- [ ] Stripe (or local SK provider) — subscriptions + optional one-time “tax pack” per year

### 2. Email notifications

- [ ] Transactional provider (Resend, Postmark, …)
- [ ] Templates SK: welcome, year-end reminder, missing rent months (opt-in)
- [ ] User notification preferences

### 3. Reminders

- [ ] Configurable dates (default: FS deadlines from rule/calendar table)
- [ ] Cron job or queue worker (BullMQ + Redis) for scheduled sends
- [ ] In-app notification center (optional)

### 4. Accountant read-only link

- [ ] Time-limited token URL → property year summary + exports
- [ ] No account required for accountant
- [ ] Revoke link

### 5. Multi-property portfolio

- [ ] Property switcher
- [ ] Consolidated dashboard (sum income/expenses; per-property tax still separate unless co-ownership added)

### 6. Bank CSV import (first bank)

- [ ] Parse one SK bank export format
- [ ] Suggest categorization; user confirms before insert
- [ ] Never auto-post without confirmation (trust)

## Growth (light)

- [ ] SEO pages: “kalkulačka prenájmu dane 2025”
- [ ] Referral: invite another landlord (optional)

## Non-goals

- Rent collection / invoicing tenants
- Legal lease templates (unless partnership)

## Exit criteria

- Paid user can complete ledger → export without support
- Reminder job runs in staging with test clock
- Entitlements enforced on API + UI

## Estimated effort

~4–6 weeks; billing integration often the long pole.
