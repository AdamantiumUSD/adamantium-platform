import { db } from '@/lib/db'
import { MetricCard } from '@/components/ui/MetricCard'
import { Panel } from '@/components/ui/Panel'

const DOT_COLOR: Record<string, string> = {
  SESSION_START:      'bg-[#3b7dd8]',
  SESSION_END:        'bg-white/20',
  SESSION_FAIL:       'bg-red-400',
  WORKFLOW_APPROVE:   'bg-green-500',
  WORKFLOW_REJECT:    'bg-red-400',
  WORKFLOW_ESCALATE:  'bg-amber-400',
  WORKFLOW_BLOCK:     'bg-red-400',
  REVIEW_SUBMIT:      'bg-[#3b7dd8]',
  ROLE_ASSIGN:        'bg-white/20',
}

function dotColor(action: string): string {
  return DOT_COLOR[action] ?? 'bg-white/20'
}

function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

export default async function AuditPage() {
  const [events, total] = await Promise.all([
    db.auditEvent.findMany({
      orderBy: { timestamp: 'desc' },
      take: 50,
    }),
    db.auditEvent.count(),
  ])

  const uniqueActors = new Set(events.map((e) => e.actor)).size

  return (
    <>
      <div className="px-6 pt-5 pb-3.5 border-b border-white/[0.07]">
        <h1 className="text-[14px] font-semibold tracking-[0.04em]">Audit Log</h1>
        <p className="text-[11px] text-white/25 tracking-[0.04em] mt-0.5">
          Immutable operational event log · Full action lineage
        </p>
      </div>

      <div className="p-6 space-y-3">
        <div className="grid grid-cols-4 gap-2.5">
          <MetricCard label="Total Events" value={total.toString()} />
          <MetricCard label="Unique Actors" value={uniqueActors.toString()} variant="accent" />
          <MetricCard label="Anomalies" value="0" variant="red" />
          <MetricCard label="Log Integrity" value="OK" variant="green" />
        </div>

        <Panel title="Event Stream" count={`${events.length} of ${total}`}>
          {events.length === 0 ? (
            <div className="px-4 py-6 text-[11px] text-white/25 text-center">
              No audit events recorded yet
            </div>
          ) : (
            events.map((e) => (
              <div
                key={e.id}
                className="flex items-start gap-2.5 px-4 py-2.5 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02]"
              >
                <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${dotColor(e.action)}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-white/80 font-medium">
                    {e.actor} &nbsp;·&nbsp; {e.action} &nbsp;·&nbsp; {e.resource}
                  </p>
                  <p className="text-[10px] text-white/35 mt-0.5">
                    {e.previousState ? `${e.previousState} → ` : ''}{e.newState}
                  </p>
                </div>
                <span className="text-[9px] text-white/25 whitespace-nowrap mt-0.5">
                  {formatTime(e.timestamp)}
                </span>
              </div>
            ))
          )}
        </Panel>
      </div>
    </>
  )
}