import { Panel } from '@/components/ui/Panel'

export default function SettingsPage() {
  return (
    <>
      <div className="px-6 pt-5 pb-3.5 border-b border-white/[0.07]">
        <h1 className="text-[14px] font-semibold tracking-[0.04em]">System Settings</h1>
        <p className="text-[11px] text-white/25 tracking-[0.04em] mt-0.5">
          Platform configuration · Operational parameters
        </p>
      </div>

      <div className="p-6 grid grid-cols-2 gap-2.5">
        <Panel title="Platform Identity">
          {[
            { label: 'Instance Name', value: 'Adamantium · Primary', color: 'text-white/60' },
            { label: 'Environment',   value: 'Phase 1 MVP',          color: 'text-amber-400' },
            { label: 'Build Version', value: '0.1.0-alpha',          color: 'text-white/60' },
          ].map((r, i) => (
            <div key={i} className="flex items-center px-4 py-2.5 border-b border-white/[0.05] last:border-0">
              <span className="text-[11px] text-white/50">{r.label}</span>
              <span className={`ml-auto text-[11px] ${r.color}`}>{r.value}</span>
            </div>
          ))}
        </Panel>

        <Panel title="Operational Roles">
          {[
            { role: 'ADMIN',    desc: 'Full access',        color: 'text-[#3b7dd8]' },
            { role: 'REVIEWER', desc: 'Workflow approval',  color: 'text-white/60' },
            { role: 'OPERATOR', desc: 'Workflow execution', color: 'text-white/60' },
            { role: 'AUDITOR',  desc: 'Read + audit only',  color: 'text-white/60' },
            { role: 'VIEWER',   desc: 'Read only',          color: 'text-white/60' },
          ].map((r, i) => (
            <div key={i} className="flex items-center px-4 py-2.5 border-b border-white/[0.05] last:border-0">
              <span className="text-[11px] text-white/80 font-medium">{r.role}</span>
              <span className={`ml-auto text-[11px] ${r.color}`}>{r.desc}</span>
            </div>
          ))}
        </Panel>
      </div>
    </>
  )
}