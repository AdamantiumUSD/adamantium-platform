import { MetricCard } from '@/components/ui/MetricCard'
import { Panel } from '@/components/ui/Panel'
import { StatusBadge } from '@/components/ui/StatusBadge'

export default function TreasuryPage() {
  return (
    <>
      <div className="px-6 pt-5 pb-3.5 border-b border-white/[0.07]">
        <h1 className="text-[14px] font-semibold tracking-[0.04em]">Treasury Visibility</h1>
        <p className="text-[11px] text-white/25 tracking-[0.04em] mt-0.5">
          Simulated reserve state · Not real custody · Not real money movement
        </p>
      </div>

      <div className="p-6 space-y-3">
        <div className="text-[10px] text-amber-400 tracking-[0.05em] bg-amber-950/20 border border-amber-700/20 px-4 py-2.5">
          SIMULATION ENVIRONMENT · All figures are illustrative. No real assets are represented or managed.
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          <MetricCard label="Simulated Total"        value="$4,200,000" sub="Simulation only"  variant="green" />
          <MetricCard label="Reserve Ratio (Sim)"    value="87.4%"                             variant="accent" />
          <MetricCard label="Pending Reconciliation" value="3"                                 variant="amber" />
          <MetricCard label="Last Reconciled"        value="2h ago" />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Panel title="Simulated Positions">
            {[
              { label: 'USD Reserve · Tier 1', custodian: 'SIM-BANK-A', value: '$2,100,000' },
              { label: 'USD Reserve · Tier 2', custodian: 'SIM-BANK-B', value: '$1,400,000' },
              { label: 'Operational Float',    custodian: 'SIM-OPS',    value: '$700,000'   },
            ].map((p, i) => (
              <div key={i} className="flex items-center px-4 py-2.5 border-b border-white/[0.05] last:border-0">
                <div>
                  <p className="text-[11px] text-white/80">{p.label}</p>
                  <p className="text-[10px] text-white/35 mt-0.5">Custodian: {p.custodian}</p>
                </div>
                <span className="ml-auto text-[12px] text-green-500">{p.value}</span>
              </div>
            ))}
          </Panel>

          <Panel title="Reconciliation Queue">
            {[
              { status: 'pending' as const, name: 'Daily Rec · Nov 30' },
              { status: 'review'  as const, name: 'Variance · SIM-BANK-B' },
              { status: 'active'  as const, name: 'End-of-month · Nov' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.05] last:border-0">
                <StatusBadge status={r.status} />
                <p className="text-[11px] text-white/80">{r.name}</p>
              </div>
            ))}
          </Panel>
        </div>
      </div>
    </>
  )
}