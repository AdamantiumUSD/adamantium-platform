import { Topbar } from './Topbar'
import { Sidebar } from './Sidebar'
import { BottomBar } from './BottomBar'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-[#0d0f11] text-[#e2e4e7] font-mono overflow-hidden">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#0d0f11]">
          {children}
        </main>
      </div>
      <BottomBar />
    </div>
  )
}