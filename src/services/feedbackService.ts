import { prisma } from "../lib/prisma.js";

export async function createFeedback(input: { body: string; email?: string; path?: string }) {
   const email = input.email?.trim() ? input.email.trim().toLowerCase() : null;
   const path = input.path?.trim() ? input.path.trim() : null;

   await prisma.feedback.create({
      data: {
         body: input.body,
         email,
         path,
      },
   });
}
