export function Topbar() {
  return (
    <header className="h-11 bg-[#131618] border-b border-white/[0.07] flex items-center px-4 gap-3 shrink-0 z-10">
      <span className="text-[11px] font-semibold tracking-[0.18em] uppercase">
        AD<span className="text-[#3b7dd8]">A</span>MANTIUM
      </span>

      <div className="w-px h-4 bg-white/[0.13]" />

      <span className="text-[9px] tracking-[0.12em] uppercase text-amber-400 bg-amber-950/30 border border-amber-700/25 px-1.5 py-px rounded-sm">
        Phase 1 · MVP
      </span>

      <div className="ml-auto flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        <span className="text-[10px] text-white/40 tracking-wider">Operational</span>
        <div className="w-px h-4 bg-white/[0.13]" />
        <div className="flex items-center gap-2 bg-[#1a1d20] border border-white/[0.07] rounded-sm px-2.5 py-1">
          <div className="w-5 h-5 rounded-sm bg-blue-950/50 border border-blue-700/30 flex items-center justify-center text-[9px] font-semibold text-[#3b7dd8]">
            JD
          </div>
          <span className="text-[11px] text-white/50">j.doe</span>
          <span className="text-[9px] uppercase tracking-wider text-[#3b7dd8] bg-blue-950/30 px-1 py-px rounded-sm">
            Admin
          </span>
        </div>
      </div>
    </header>
  )
}