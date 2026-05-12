import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const db = new PrismaClient()

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 100_000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

async function main() {
  const existing = await db.user.findUnique({ where: { username: 'admin' } })
  if (existing) {
    console.log('Admin user already exists — skipping')
    return
  }
  await db.user.create({
    data: {
      username: 'admin',
      passwordHash: hashPassword('changeme123'),
      role: 'ADMIN',
      isActive: true,
    },
  })
  console.log('Created: admin / changeme123')
}

main().catch(console.error).finally(() => db.$disconnect())