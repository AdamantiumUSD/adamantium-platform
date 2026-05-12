import { db } from './db'

interface LogParams {
  actor: string
  action: string
  resource: string
  previousState?: string | null
  newState: string
  metadata?: Record<string, unknown>
  ipAddress?: string
  userId?: string
}

export async function logAuditEvent(params: LogParams): Promise<void> {
  try {
    await db.auditEvent.create({ data: params })
  } catch (error) {
    console.error('[AUDIT] Failed to write audit event:', error)
  }
}