type Variant = 'default' | 'accent' | 'green' | 'amber' | 'red'

const VALUE_COLOR: Record<Variant, string> = {
  default: 'text-[#e2e4e7]',
  accent:  'text-[#3b7dd8]',
  green:   'text-green-500',
  amber:   'text-amber-400',
  red:     'text-red-400',
}

export function MetricCard({
  label,
  value,
  sub,
  variant = 'default',
}: {
  label: string
  value: string
  sub?: string
  variant?: Variant
}) {
  return (
    <div className="bg-[#131618] border border-white/[0.07] p-4">
      <p className="text-[9px] uppercase tracking-[0.12em] text-white/25 mb-2">{label}</p>
      <p className={`text-[22px] font-semibold tracking-tight ${VALUE_COLOR[variant]}`}>{value}</p>
      {sub && <p className="text-[10px] text-white/25 mt-1">{sub}</p>}
    </div>
  )
}