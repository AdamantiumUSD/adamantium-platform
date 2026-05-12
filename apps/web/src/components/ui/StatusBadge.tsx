type Status = 'pending' | 'active' | 'review' | 'blocked'

const STYLES: Record<Status, string> = {
  pending: 'bg-amber-950/30 text-amber-400 border border-amber-700/25',
  active:  'bg-blue-950/30 text-[#3b7dd8] border border-blue-700/25',
  review:  'bg-green-950/30 text-green-500 border border-green-800/25',
  blocked: 'bg-red-950/40 text-red-400 border border-red-800/30',
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`text-[9px] uppercase tracking-[0.08em] px-1.5 py-px rounded-sm ${STYLES[status]}`}>
      {status}
    </span>
  )
}