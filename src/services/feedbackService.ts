import { prisma } from "../lib/prisma.js";

export async function createFeedback(input: { body: string; email?: string }) {
   const email = input.email?.trim() ? input.email.trim().toLowerCase() : null;

   await prisma.feedback.create({
      data: {
         body: input.body,
         email,
      },
   });
}
