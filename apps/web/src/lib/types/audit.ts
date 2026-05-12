export type AuditActor = string

export type AuditAction =
  | 'WORKFLOW_APPROVE'
  | 'WORKFLOW_REJECT'
  | 'WORKFLOW_ESCALATE'
  | 'WORKFLOW_BLOCK'
  | 'REVIEW_SUBMIT'
  | 'ROLE_ASSIGN'
  | 'SESSION_START'
  | 'SESSION_END'
  | (string & {})

export interface AuditEvent {
  id: string
  actor: AuditActor
  action: AuditAction
  resource: string
  timestamp: string
  previous_state: string | null
  new_state: string
  metadata?: Record<string, unknown>
}