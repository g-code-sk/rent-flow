import { z } from "zod";

const honeypot = z.string().max(200).optional().default("");

export const waitlistSchema = z.object({
   email: z.string().trim().email(),
   consent: z.literal(true),
   website: honeypot,
});

const optionalEmail = z
   .string()
   .trim()
   .optional()
   .transform(value => (value === "" ? undefined : value))
   .pipe(z.string().email().optional());

export const feedbackSchema = z.object({
   body: z.string().trim().min(1).max(5000),
   email: optionalEmail,
   website: honeypot,
});

export type WaitlistBody = z.infer<typeof waitlistSchema>;
export type FeedbackBody = z.infer<typeof feedbackSchema>;
