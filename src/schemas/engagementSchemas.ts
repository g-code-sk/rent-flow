import { z } from "zod";

const honeypot = z.string().max(200).optional().default("");

export const waitlistSchema = z.object({
   email: z.string().trim().email("Neplatný e-mail"),
   consent: z.literal(true, "Potvrďte súhlas so zasielaním e-mailov"),
   website: honeypot,
});

export const optOutSchema = z.object({
   email: z.string().trim().email("Neplatný e-mail"),
   website: honeypot,
});

const optionalEmail = z
   .string()
   .trim()
   .optional()
   .transform(value => (value === "" ? undefined : value))
   .pipe(z.string().email("Neplatný e-mail").optional());

export const feedbackSchema = z.object({
   body: z.string().trim().min(1, "Napíšte, čo by ste použili").max(5000, "Najviac 5000 znakov"),
   email: optionalEmail,
   website: honeypot,
});

export type WaitlistBody = z.infer<typeof waitlistSchema>;
export type FeedbackBody = z.infer<typeof feedbackSchema>;
export type OptOutBody = z.infer<typeof optOutSchema>;
