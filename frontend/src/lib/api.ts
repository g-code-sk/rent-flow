export type ApiErrorBody = {
   code: string
   message: string
   details?: unknown
}

export type ApiSuccess<T> = { ok: true; data: T }
export type ApiFailure = { ok: false; error: ApiErrorBody }
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
   return typeof value === 'object' && value !== null && 'ok' in value && typeof (value as { ok: unknown }).ok === 'boolean'
}

export async function postJson<T>(url: string, body: unknown): Promise<ApiResponse<T>> {
   try {
      const response = await fetch(url, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(body),
      })
      const json: unknown = await response.json()
      if (isApiResponse<T>(json)) {
         return json
      }
   } catch {
      // Network or non-JSON body
   }

   return { ok: false, error: { code: 'internal_error', message: 'Niečo sa pokazilo.' } }
}

export function getFieldErrorMessage(details: unknown, field: string): string | undefined {
   if (typeof details !== 'object' || details === null || !('fieldErrors' in details)) {
      return undefined
   }

   const fieldErrors = (details as { fieldErrors?: Record<string, string[] | undefined> }).fieldErrors
   const messages = fieldErrors?.[field]
   return messages?.[0]
}
