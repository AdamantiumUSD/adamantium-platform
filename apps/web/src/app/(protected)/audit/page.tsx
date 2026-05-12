import { MetricCard } from '@/components/ui/MetricCard'
import { Panel } from '@/components/ui/Panel'

const EVENTS = [
  { dot: 'bg-green-500',   actor: 'j.doe · ADMIN',     action: 'WORKFLOW_APPROVE', resource: 'WF-0041', prev: 'PENDING_REVIEW', next: 'APPROVED',          time: '14:02:31' },
  { dot: 'bg-[#3b7dd8]',  actor: 'm.chen · REVIEWER',  action: 'REVIEW_SUBMIT',    resource: 'WF-0039', prev: 'IN_REVIEW',      next: 'PENDING_APPROVAL',  time: '13:51:14' },
  { dot: 'bg-amber-400',  actor: 'r.patel · OPERATOR',  action: 'WORKFLOW_ESCALATE',resource: 'WF-0038', prev: 'ACTIVE',         next: 'ESCALATED (tier 2)',time: '13:28:06' },
  { dot: 'bg-red-400',    actor: 'system · AUTO',       action: 'WORKFLOW_BLOCK',   resource: 'WF-0037', prev: 'ACTIVE',         next: 'BLOCKED',           time: '13:00:17' },
  { dot: 'bg-white/20',   actor: 'j.doe · ADMIN',       action: 'ROLE_ASSIGN',      resource: 'user:k.jones', prev: 'VIEWER',   next: 'AUDITOR',           time: '11:14:42' },
  { dot: 'bg-[#3b7dd8]',  actor: 'k.jones · AUDITOR',  action: 'SESSION_START',    resource: 'auth',    prev: null,             next: 'AUTHENTICATED',     time: '10:58:03' },
]

export default function AuditPage() {
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
          <MetricCard label="Total Events · 24h" value="124" />
          <MetricCard label="Unique Actors"      value="6"   variant="accent" />
          <MetricCard label="Anomalies"          value="0"   variant="red" />
          <MetricCard label="Log Integrity"      value="OK"  variant="green" />
        </div>

        <Panel title="Event Stream" count="actor · action · resource · timestamp">
          {EVENTS.map((e, i) => (
            <div key={i} className="flex items-start gap-2.5 px-4 py-2.5 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02]">
              <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${e.dot}`} />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-white/80 font-medium">
                  {e.actor} &nbsp;·&nbsp; {e.action} &nbsp;·&nbsp; {e.resource}
                </p>
                <p className="text-[10px] text-white/35 mt-0.5">
                  {e.prev ? `${e.prev} → ` : ''}{e.next}
                </p>
              </div>
              <span className="text-[9px] text-white/25 whitespace-nowrap mt-0.5">{e.time}</span>
            </div>
          ))}
        </Panel>
      </div>
    </>
  )
}