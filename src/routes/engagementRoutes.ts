import { Router } from 'express'
import { sendOk } from '../http/apiResponse.js'
import { rejectHoneypot } from '../http/honeypot.js'
import { rateLimit } from '../http/rateLimit.js'
import { validate } from '../http/validate.js'
import { type FeedbackBody, type WaitlistBody, feedbackSchema, waitlistSchema } from '../schemas/engagementSchemas.js'
import { createFeedback } from '../services/feedbackService.js'
import { subscribeWaitlist } from '../services/waitlistService.js'

export const engagementRouter = Router()

engagementRouter.post('/waitlist', rateLimit, validate(waitlistSchema), rejectHoneypot, async (req, res) => {
   const { email } = req.body as WaitlistBody

   await subscribeWaitlist(email)
   sendOk(res, null, 201)
})

engagementRouter.post('/feedback', rateLimit, validate(feedbackSchema), rejectHoneypot, async (req, res) => {
   const { body, email } = req.body as FeedbackBody

   await createFeedback({ body, email })
   sendOk(res, null, 201)
})
