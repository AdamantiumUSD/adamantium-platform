import { cookies } from 'next/headers'
import { db } from './db'
import crypto from 'crypto'

const SESSION_COOKIE = 'adm_session'
const SESSION_DURATION_HOURS = 8

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 100_000, 64, 'sha512')
    .toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  const verify = crypto
    .pbkdf2Sync(password, salt, 100_000, 64, 'sha512')
    .toString('hex')
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(verify))
}

export async function createSession(
  userId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<string> {
  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000)
  await db.session.create({ data: { token, userId, expiresAt, ipAddress, userAgent } })
  return token
}

export async function getSessionUser(token: string) {
  const session = await db.session.findUnique({
    where: { token },
    include: { user: true },
  })
  if (!session) return null
  if (session.expiresAt < new Date()) {
    await db.session.delete({ where: { token } })
    return null
  }
  if (!session.user.isActive) return null
  return session.user
}

export async function deleteSession(token: string): Promise<void> {
  await db.session.delete({ where: { token } }).catch(() => {})
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(SESSION_COOKIE)?.value
}

export function SESSION_COOKIE_NAME(): string {
  return SESSION_COOKIE
}

export async function getCurrentUser() {
  const token = await getSessionToken()
  if (!token) return null
  return getSessionUser(token)
}