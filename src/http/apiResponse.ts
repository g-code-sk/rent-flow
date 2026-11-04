import type { Response } from 'express'

export type ApiErrorBody = {
   code: string
   message: string
   details?: unknown
}

export type ApiSuccess<T> = { ok: true; data: T }
export type ApiFailure = { ok: false; error: ApiErrorBody }
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure

export function sendOk<T>(res: Response, data: T, status: number = 200) {
   const body: ApiSuccess<T> = { ok: true, data }
   return res.status(status).json(body)
}

export function sendError(res: Response, status: number, code: string, message: string, details?: unknown) {
   const error: ApiErrorBody = {
      code,
      message,
      ...(details !== undefined ? { details } : {}),
   }
   const body: ApiFailure = { ok: false, error }
   return res.status(status).json(body)
}
