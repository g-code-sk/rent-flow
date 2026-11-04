---
name: commit
description: Create a git commit from the current working tree using this repo's message style. Use when the user asks to commit, make a commit, or run /commit.
---

# Commit

Commit only when the user asks. Do not push unless they ask.

## Steps

1. In parallel: `git status`, `git diff`, `git log --oneline -15`.
2. Stage the files that belong in this commit. Do not add secrets (`.env`, credentials) or unrelated untracked files (for example `.cursor/` unless the user asked).
3. Try to make as few commits as possible but still separate if needed.
4. If there is nothing to commit, stop. Do not create an empty commit.
5. Commit with a HEREDOC message. Do not use `--no-verify` or amend unless the user asked.

```bash
git commit -m "$(cat <<'EOF'
feat(frontend): short why-focused subject

One sentence on what changed, so the log reads without opening the diff.

EOF
)"
```

6. Run `git status` and `git log -1 --format=%B` after the commit.
7. If the message contains `Co-authored-by: Cursor <cursoragent@cursor.com>`, that line was appended after the HEREDOC. Remove it before you finish. Do not run `git commit` or `git commit --amend` again — that appends the line a second time. Rewrite with `git commit-tree` (same tree, parent, author, and dates) and `git reset --soft` to the new commit. Confirm `git log -1 --format=%B` has no trailer.

## Message

One conventional-commit subject, imperative, ~72 chars, **why** not a file list. Then a blank line and one short sentence on what changed.

| Prefix     | Use                              |
| ---------- | -------------------------------- |
| `feat`     | new behavior                     |
| `fix`      | bug fix                          |
| `refactor` | same behavior, clearer structure |
| `docs`     | docs only                        |
| `chore`    | tooling, deps, config            |

Scope when the change is one side: `(frontend)`, `(api)`. Omit scope for cross-cutting work.

Follow recent `git log` style. Examples:

```text
feat(api): add waitlist and feedback endpoints with a shared JSON envelope

Both routes share one JSON envelope so the client can handle success and errors the same way.

feat(frontend): persist calculator draft and extract useCalculator

The draft survives a refresh, and the page reads its state from one hook.

fix(frontend): subtract expenses from net income

Net income was using income before expenses, so the summary overstated what was left.
```

Do not add `Co-authored-by: Cursor <cursoragent@cursor.com>` or any other trailer. Keep the description to one sentence.
