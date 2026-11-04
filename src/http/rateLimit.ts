import type { NextFunction, Request, Response } from 'express'
import { sendError } from './apiResponse.js'

const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 10

const hits = new Map<string, { count: number; resetAt: number }>()

function deleteExpired(now: number) {
   for (const [ip, entry] of hits) {
      if (now >= entry.resetAt) {
         hits.delete(ip)
      }
   }
}

export function rateLimit(req: Request, res: Response, next: NextFunction) {
   const ip = req.ip ?? req.socket.remoteAddress ?? 'unknown'
   const now = Date.now()

   deleteExpired(now)

   const current = hits.get(ip)

   if (!current) {
      hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
      next()
      return
   }

   current.count += 1
   if (current.count > MAX_REQUESTS) {
      sendError(res, 429, 'rate_limited', 'Príliš veľa pokusov. Skúste neskôr.')
      return
   }

   next()
}
