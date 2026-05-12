export function BottomBar() {
  return (
    <footer className="h-7 bg-[#131618] border-t border-white/[0.07] flex items-center px-4 gap-4 shrink-0">
      <div className="flex items-center gap-1.5">
        <span className="w-1 h-1 rounded-full bg-green-500" />
        <span className="text-[9px] text-white/30 tracking-wider">System nominal</span>
      </div>
      <span className="text-[9px] text-white/20">·</span>
      <span className="text-[9px] text-white/30 tracking-wider">Audit logging active</span>
      <span className="text-[9px] text-white/20 ml-auto">adm-primary · UTC+00:00</span>
    </footer>
  )
}