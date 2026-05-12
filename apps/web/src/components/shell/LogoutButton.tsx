'use client'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="text-[9px] text-white/25 hover:text-white/60 tracking-wider uppercase ml-1 transition-colors"
    >
      Exit
    </button>
  )
}