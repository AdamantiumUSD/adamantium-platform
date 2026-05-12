import { StatusBadge } from '@/components/ui/StatusBadge'
import { Panel } from '@/components/ui/Panel'

const WORKFLOWS = [
  { id: 'WF-0041', status: 'pending' as const, name: 'Reserve Reconciliation · Q4',    creator: 'r.patel', date: '2024-11-28', age: '2d' },
  { id: 'WF-0040', status: 'blocked' as const, name: 'Counterparty Approval · OP-118', creator: 'm.chen',  date: '2024-11-25', age: '5d' },
  { id: 'WF-0039', status: 'active'  as const, name: 'Policy Amendment · SEC-7b',      creator: 'j.doe',   date: '2024-11-29', age: '1d' },
  { id: 'WF-0038', status: 'review'  as const, name: 'Operational Report · Nov 2024',  creator: 'k.jones', date: '2024-11-30', age: '4h' },
  { id: 'WF-0037', status: 'pending' as const, name: 'Access Review · Q4 Cycle',       creator: 'j.doe',   date: '2024-11-29', age: '1d' },
  { id: 'WF-0036', status: 'blocked' as const, name: 'Vendor Onboarding · ACME Corp',  creator: 'r.patel', date: '2024-11-22', age: '8d' },
  { id: 'WF-0035', status: 'active'  as const, name: 'Compliance Attestation · Q4',    creator: 'm.chen',  date: '2024-11-27', age: '3d' },
]

export default function WorkflowsPage() {
  return (
    <>
      <div className="px-6 pt-5 pb-3.5 border-b border-white/[0.07]">
        <h1 className="text-[14px] font-semibold tracking-[0.04em]">Governance Workflow Engine</h1>
        <p className="text-[11px] text-white/25 tracking-[0.04em] mt-0.5">
          Approval routing · Review queues · Escalation management
        </p>
      </div>

      <div className="p-6">
        <Panel title="All Workflows" count={`${WORKFLOWS.length} active`}>
          {WORKFLOWS.map((w) => (
            <div key={w.id} className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.02]">
              <StatusBadge status={w.status} />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-white/80">{w.name}</p>
                <p className="text-[10px] text-white/35 mt-0.5">{w.id} · Created by {w.creator} · {w.date}</p>
              </div>
              <span className="text-[9px] text-white/25">{w.age}</span>
            </div>
          ))}
        </Panel>
      </div>
    </>
  )
}