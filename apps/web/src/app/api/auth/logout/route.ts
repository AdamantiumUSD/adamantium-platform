import { NextResponse } from 'next/server'
import { getSessionToken, deleteSession, getCurrentUser, SESSION_COOKIE_NAME } from '@/lib/auth'
import { logAuditEvent } from '@/lib/audit'

export async function POST() {
  const token = await getSessionToken()

  if (token) {
    const user = await getCurrentUser()
    await deleteSession(token)
    if (user) {
      await logAuditEvent({
        actor: `${user.username} · ${user.role}`,
        action: 'SESSION_END',
        resource: 'auth',
        previousState: 'AUTHENTICATED',
        newState: 'LOGGED_OUT',
        userId: user.id,
      })
    }
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.delete(SESSION_COOKIE_NAME())
  return response
}