import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 200)
    const offset = parseInt(searchParams.get('offset') ?? '0')

    const [events, total] = await Promise.all([
      db.auditEvent.findMany({
        orderBy: { timestamp: 'desc' },
        take: limit,
        skip: offset,
      }),
      db.auditEvent.count(),
    ])

    return NextResponse.json({ events, total, limit, offset })
  } catch (error) {
    console.error('[AUDIT] Fetch error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}