import { Router } from 'express'
import { sendOk } from '../http/apiResponse.js'
import { rejectHoneypot } from '../http/honeypot.js'
import { rateLimit } from '../http/rateLimit.js'
import { validate } from '../http/validate.js'
import { type FeedbackBody, type OptOutBody, type WaitlistBody, feedbackSchema, optOutSchema, waitlistSchema } from '../schemas/engagementSchemas.js'
import { createFeedback } from '../services/feedbackService.js'
import { optOutEmail } from '../services/optOutService.js'
import { subscribeWaitlist } from '../services/waitlistService.js'

export const engagementRouter = Router()

engagementRouter.post('/waitlist', rateLimit, rejectHoneypot, validate(waitlistSchema), async (req, res) => {
   const { email } = req.body as WaitlistBody

   await subscribeWaitlist(email)
   sendOk(res, null, 201)
})

engagementRouter.post('/feedback', rateLimit, rejectHoneypot, validate(feedbackSchema), async (req, res) => {
   const { body, email } = req.body as FeedbackBody

   await createFeedback({ body, email })
   sendOk(res, null, 201)
})

engagementRouter.post('/opt-out', rateLimit, rejectHoneypot, validate(optOutSchema), async (req, res) => {
   const { email } = req.body as OptOutBody

   await optOutEmail(email)
   sendOk(res, null)
})
