import { MetricCard } from '@/components/ui/MetricCard'
import { Panel } from '@/components/ui/Panel'
import { StatusBadge } from '@/components/ui/StatusBadge'

const AUDIT_EVENTS = [
  { actor: 'j.doe · ADMIN',    action: 'Approved workflow · WF-0041',          dot: 'bg-green-500', time: '2m ago'    },
  { actor: 'm.chen · REVIEWER', action: 'Submitted review · WF-0039',           dot: 'bg-[#3b7dd8]', time: '11m ago'   },
  { actor: 'r.patel · OPERATOR', action: 'Escalated · WF-0038 → tier 2',        dot: 'bg-amber-400', time: '34m ago'   },
  { actor: 'system · AUTO',    action: 'Blocked · WF-0037 (threshold breach)',  dot: 'bg-red-400',   time: '1h 12m'    },
  { actor: 'j.doe · ADMIN',    action: 'Role assigned · k.jones → AUDITOR',     dot: 'bg-white/20',  time: '3h ago'    },
]

const WORKFLOWS = [
  { status: 'pending' as const, name: 'Reserve Reconciliation · Q4',   assignee: 'm.chen',    age: '2d' },
  { status: 'blocked' as const, name: 'Counterparty Approval · OP-118', assignee: 'r.patel',   age: '5d' },
  { status: 'active'  as const, name: 'Policy Amendment · SEC-7b',      assignee: 'j.doe',     age: '1d' },
  { status: 'review'  as const, name: 'Operational Report · Nov 2024',  assignee: 'k.jones',   age: '4h' },
  { status: 'pending' as const, name: 'Access Review · Q4 Cycle',       assignee: 'unassigned', age: '1d' },
]

export default function DashboardPage() {
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
          <MetricCard label="Active Workflows"  value="7"     sub="3 pending review"      variant="accent" />
          <MetricCard label="Audit Events · 24h" value="124"  sub="0 anomalies flagged" />
          <MetricCard label="Treasury (Sim)"    value="$4.2M" sub="Simulation only"       variant="green" />
          <MetricCard label="Blocked Items"     value="2"     sub="Requires escalation"   variant="red" />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Panel title="Recent Audit Events" count="Showing 5 of 124">
            {AUDIT_EVENTS.map((e, i) => (
              <div key={i} className="flex items-start gap-2.5 px-4 py-2.5 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02]">
                <span className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${e.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-white/80 font-medium">{e.actor}</p>
                  <p className="text-[10px] text-white/40 mt-0.5">{e.action}</p>
                </div>
                <span className="text-[9px] text-white/25 whitespace-nowrap mt-0.5">{e.time}</span>
              </div>
            ))}
          </Panel>

          <Panel title="Workflow Queue" count="7 active">
            {WORKFLOWS.map((w, i) => (
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