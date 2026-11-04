---
name: code-review
description: Review diffs and pull requests for correctness, security, and maintainability. Use when the user asks for a code review, PR review, or feedback on recent changes.
---

# Code Review

## Scope

Review only what changed (diff, PR, or named files). Do not nitpick unrelated code.

Tests are out of scope for this MVP. Do not request tests, flag missing tests, or treat lack of coverage as a finding.

1. Identify the change: `git diff`, `git diff main...HEAD`, or the files the user named.
2. Read surrounding code only when needed to judge correctness.
3. Report findings. Do not implement fixes unless the user asks.

## What to look for

- **Bugs**: wrong logic, missed edge cases, broken error handling, race conditions
- **Security**: injection, auth/authz gaps, secrets in code, unsafe deserialization
- **Correctness vs existing patterns**: APIs, naming, and architecture already in the repo
- Skip style nits unless they hide a real bug or violate a project convention.

## Output

Lead with a one-line verdict: **Looks good**, **Nits only**, or **Needs changes**.

Then list findings:

- 🔴 **Blocker**: must fix before merge
- 🟡 **Should fix**: likely bug or maintainability issue
- 🟢 **Nit**: optional

Each finding: file + what is wrong + why it matters + a concrete fix (short, no drive-by refactors).

If there are no issues, say so and mention one thing that is solid.
