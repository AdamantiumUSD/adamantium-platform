import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyPassword, createSession, SESSION_COOKIE_NAME } from '@/lib/auth'
import { logAuditEvent } from '@/lib/audit'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    const user = await db.user.findUnique({ where: { username } })

    if (!user || !user.isActive || !verifyPassword(password, user.passwordHash)) {
      await logAuditEvent({
        actor: `${username} · UNKNOWN`,
        action: 'SESSION_FAIL',
        resource: 'auth',
        previousState: null,
        newState: 'REJECTED',
        ipAddress: req.headers.get('x-forwarded-for') ?? undefined,
      })
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await createSession(
      user.id,
      req.headers.get('x-forwarded-for') ?? undefined,
      req.headers.get('user-agent') ?? undefined
    )

    await logAuditEvent({
      actor: `${user.username} · ${user.role}`,
      action: 'SESSION_START',
      resource: 'auth',
      previousState: null,
      newState: 'AUTHENTICATED',
      ipAddress: req.headers.get('x-forwarded-for') ?? undefined,
      userId: user.id,
    })

    const response = NextResponse.json({ ok: true })
    response.cookies.set(SESSION_COOKIE_NAME(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    })
    return response
  } catch (error) {
    console.error('[AUTH] Login error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}