import { prisma } from '../lib/prisma.js'

export async function subscribeWaitlist(email: string) {
   const normalizedEmail = email.toLowerCase()

   await prisma.waitlistEmail.upsert({
      where: { email: normalizedEmail },
      create: {
         email: normalizedEmail,
         consentedAt: new Date(),
      },
      update: {},
   })
}
