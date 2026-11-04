# Project guidelines

Conventions for the Express API and React app. Product/roadmap docs live in the other files in this folder.

## File names

Tabs only show the basename. Suffix the **role** of the file so `engagement.ts` in two folders is not ambiguous:

| Role                    | Pattern       | Example                |
| ----------------------- | ------------- | ---------------------- |
| HTTP routes             | `*Routes.ts`  | `engagementRoutes.ts`  |
| Zod bodies              | `*Schemas.ts` | `engagementSchemas.ts` |
| Persistence / use-cases | `*Service.ts` | `waitlistService.ts`   |

Keep names like `rateLimit.ts`, `validate.ts`, `honeypot.ts` when the name already is the role. Shared JSON envelope helpers live in `apiResponse.ts`.

## JSON envelope

Every JSON response is `ApiResponse<T>` from `src/http/apiResponse.ts`. HTTP status stays on the response; the body does not repeat it.

```ts
{ ok: true, data: T }           // sendOk(res, data, status?)
{ ok: false, error: { code, message, details? } }  // sendError(...)
```

Waitlist/feedback/honeypot: `201` and `data: null`. Health: `200` and `data: { status: "ok" }`. `OPTIONS` stays `204` with no body.

## API errors (Express 5)

This is not Laravel. Express does not map Prisma/SQL exceptions to HTTP status codes. Mapping lives in code we write.

**Routes:** do not wrap `await` in `try/catch` only to call `next(error)`. Express 5 forwards a rejected async handler to the 4-arg error middleware in `src/app.ts`.

```ts
// yes
await createFeedback({ body, email })
sendOk(res, null, 201)

// no - same as Express 5 already does
try {
   await createFeedback({ body, email })
   sendOk(res, null, 201)
} catch (error) {
   next(error)
}
```

**Services:** catch only when a thrown error is a **domain outcome**, not a 500. Prefer not throwing for expected cases: waitlist uses `upsert` (Laravel `firstOrCreate`) so a duplicate email is not an exception.

**Global handler** (`src/app.ts`): log the real error, respond with `sendError(..., "internal_error", ...)`. Do not send Prisma codes, SQL, or stacks in production responses.

**Validation:** Zod via `validate()` middleware (400 + field `details`). Not the global handler.

If a Prisma code should become 404/409 for clients, map it in the global handler (or a small helper it calls), not in every route.

## HTTP vs Laravel

| Laravel                     | Here                                                   |
| --------------------------- | ------------------------------------------------------ |
| Form Request                | `src/http/validate.ts` + schema                        |
| `Model::firstOrCreate`      | Prisma `upsert` with `update: {}`                      |
| `Handler` + `APP_DEBUG`     | `app.ts` error middleware; public body always stripped |
| `JsonResource` / `{ data }` | `sendOk` / `sendError` (`ApiResponse<T>`)              |
