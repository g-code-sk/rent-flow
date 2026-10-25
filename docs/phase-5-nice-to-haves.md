# Phase 5 — Nice-to-haves

**Status:** Not started  
**Depends on:** Product traction from Phases 1–4

Only pursue items here when users or metrics justify them. **Not** part of long-term private landlord MVP.

## Candidates (unordered backlog)

### Tenancy & operations

- Lease entity: start/end, notice period, indexation date reminders
- Tenant contact (GDPR-minimal: name optional, rent amount reference)
- Document store: zmluva o nájme, odovzdávací protokol

### Ownership & edge cases

- Co-ownership split (% per owner, split income/expenses)
- Multiple owners as separate user accounts + shared property (hard — defer)

### Short-term / platforms

- Airbnb / Booking import
- Different tax treatment path — **separate product surface**, do not mix into MVP calculator defaults

### Advanced tax

- Depreciation schedules where applicable to user type
- Quarterly advance tax estimates + payment tracking
- Health/social insurance guidance for edge cases (business-like rental)

### Integrations

- Second and third bank CSV formats
- Open banking (if SK market matures for your audience)
- Export to konkrétne účtovné software (Pohoda, etc.) — needs partnership/spec

### Product

- English UI for expat landlords
- PWA: photo capture of receipts offline
- Mobile-native apps (only if PWA insufficient)

### Platform

- OAuth (Google/Apple)
- Team access (property manager firm) — B2B tier

## Selection criteria

Prioritize if:

- Requested by &gt; 20% of active Pro users, or
- Unlocks partnership (accountants, real estate agencies), or
- Reduces support burden (import, clearer lease reminders)

Deprioritize if:

- Serves short-term rental primarily
- Requires legal liability you cannot support (automated filing)

## Exit criteria

Per feature: own mini-spec in a new doc under `docs/features/` when promoted out of this backlog.
