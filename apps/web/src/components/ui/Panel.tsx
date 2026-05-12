export function Panel({
  title,
  count,
  children,
}: {
  title: string
  count?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#131618] border border-white/[0.07]">
      <div className="flex items-center px-4 py-[11px] border-b border-white/[0.07]">
        <span className="text-[10px] uppercase tracking-[0.12em] text-white/50">{title}</span>
        {count && (
          <span className="ml-auto text-[9px] text-white/25 tracking-wider">{count}</span>
        )}
      </div>
      <div>{children}</div>
    </div>
  )
}