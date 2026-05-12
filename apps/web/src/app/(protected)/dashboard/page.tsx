import { db } from '@/lib/db'
import { MetricCard } from '@/components/ui/MetricCard'
import { Panel } from '@/components/ui/Panel'
import { StatusBadge } from '@/components/ui/StatusBadge'

const DOT_COLOR: Record<string, string> = {
  SESSION_START:     'bg-[#3b7dd8]',
  SESSION_END:       'bg-white/20',
  SESSION_FAIL:      'bg-red-400',
  WORKFLOW_APPROVE:  'bg-green-500',
  WORKFLOW_REJECT:   'bg-red-400',
  WORKFLOW_ESCALATE: 'bg-amber-400',
  WORKFLOW_BLOCK:    'bg-red-400',
  REVIEW_SUBMIT:     'bg-[#3b7dd8]',
  ROLE_ASSIGN:       'bg-white/20',
}

function dotColor(action: string): string {
  return DOT_COLOR[action] ?? 'bg-white/20'
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

const STATIC_WORKFLOWS = [
  { status: 'pending' as const, name: 'Reserve Reconciliation · Q4',   assignee: 'm.chen',     age: '2d' },
  { status: 'blocked' as const, name: 'Counterparty Approval · OP-118', assignee: 'r.patel',   age: '5d' },
  { status: 'active'  as const, name: 'Policy Amendment · SEC-7b',      assignee: 'j.doe',     age: '1d' },
  { status: 'review'  as const, name: 'Operational Report · Nov 2024',  assignee: 'k.jones',   age: '4h' },
  { status: 'pending' as const, name: 'Access Review · Q4 Cycle',       assignee: 'unassigned', age: '1d' },
]

export default async function DashboardPage() {
  const [auditTotal, recentEvents] = await Promise.all([
    db.auditEvent.count(),
    db.auditEvent.findMany({
      orderBy: { timestamp: 'desc' },
      take: 5,
    }),
  ])

  return (
    <>
      <div className="px-6 pt-5 pb-3.5 border-b border-white/[0.07] flex items-end gap-4">
        <div>
          <h1 className="text-[14px] font-semibold tracking-[0.04em]">Operations Dashboard</h1>
          <p className="text-[11px] text-white/25 tracking-[0.04em] mt-0.5">
            System-wide operational summary · All modules
          </p>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <div className="grid grid-cols-4 gap-2.5">
          <MetricCard label="Active Workflows"   value="7"                    sub="3 pending review"    variant="accent" />
          <MetricCard label="Audit Events"       value={auditTotal.toString()} sub="All time"           />
          <MetricCard label="Treasury (Sim)"     value="$4.2M"                sub="Simulation only"    variant="green" />
          <MetricCard label="Blocked Items"      value="2"                    sub="Requires escalation" variant="red" />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Panel title="Recent Audit Events" count={`Showing ${recentEvents.length} of ${auditTotal}`}>
            {recentEvents.length === 0 ? (
              <div className="px-4 py-6 text-[11px] text-white/25 text-center">
                No audit events recorded yet
              </div>
            ) : (
              recentEvents.map((e) => (
                <div key={e.id} className="flex items-start gap-2.5 px-4 py-2.5 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02]">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${dotColor(e.action)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-white/80 font-medium">{e.actor}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">{e.action} · {e.resource}</p>
                  </div>
                  <span className="text-[9px] text-white/25 whitespace-nowrap mt-0.5">
                    {timeAgo(e.timestamp)}
                  </span>
                </div>
              ))
            )}
          </Panel>

          <Panel title="Workflow Queue" count="7 active">
            {STATIC_WORKFLOWS.map((w, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02]">
                <StatusBadge status={w.status} />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-white/80">{w.name}</p>
                  <p className="text-[10px] text-white/35 mt-0.5">Assignee · {w.assignee}</p>
                </div>
                <span className="text-[9px] text-white/25">{w.age}</span>
              </div>
            ))}
          </Panel>
        </div>
      </div>
    </>
  )
}