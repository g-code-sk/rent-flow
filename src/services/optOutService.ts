import { prisma } from '../lib/prisma.js'

export async function optOutEmail(email: string) {
   const normalizedEmail = email.toLowerCase()

   await prisma.$transaction([
      prisma.waitlistEmail.deleteMany({ where: { email: normalizedEmail } }),
      prisma.feedback.updateMany({
         where: { email: normalizedEmail },
         data: { email: null },
      }),
   ])
}
