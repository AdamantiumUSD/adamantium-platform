'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        router.push('/dashboard')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error ?? 'Authentication failed')
      }
    } catch {
      setError('Network error — try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-[#0d0f11] flex items-center justify-center">
      <div className="w-full max-w-sm px-4">

        <div className="mb-8">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/90">
            AD<span className="text-[#3b7dd8]">A</span>MANTIUM
          </p>
          <p className="text-[9px] tracking-[0.12em] uppercase text-white/25 mt-1">
            Institutional Operations Platform
          </p>
        </div>

        <div className="bg-[#131618] border border-white/[0.07] p-6">
          <div className="mb-5">
            <p className="text-[13px] text-white/80 font-medium">Sign in</p>
            <p className="text-[10px] text-white/30 mt-0.5 tracking-wide">
              Authorized personnel only
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[9px] uppercase tracking-[0.12em] text-white/35 mb-1.5">
                User ID
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="username"
                disabled={loading}
                className="w-full bg-[#0d0f11] border border-white/[0.07] text-[12px] text-white/80 placeholder:text-white/20 px-3 py-2 outline-none focus:border-[#3b7dd8]/50 transition-colors disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.12em] text-white/35 mb-1.5">
                Passphrase
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="••••••••"
                disabled={loading}
                className="w-full bg-[#0d0f11] border border-white/[0.07] text-[12px] text-white/80 placeholder:text-white/20 px-3 py-2 outline-none focus:border-[#3b7dd8]/50 transition-colors disabled:opacity-50"
              />
            </div>
          </div>

          {error && (
            <div className="mt-3 text-[10px] text-red-400 bg-red-950/30 border border-red-800/30 px-3 py-2">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading || !username || !password}
            className="w-full mt-5 bg-[#3b7dd8] hover:bg-[#2f6bbf] disabled:opacity-40 disabled:cursor-not-allowed text-white text-[11px] font-medium tracking-[0.06em] uppercase py-2.5 transition-colors"
          >
            {loading ? 'Authenticating...' : 'Authenticate'}
          </button>

          <p className="text-[9px] text-white/20 tracking-wider mt-4 text-center">
            Access is role-restricted · ADMIN · REVIEWER · OPERATOR · AUDITOR · VIEWER
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[9px] text-white/15 tracking-wider">Build · v0.1.0-alpha</p>
          <p className="text-[9px] text-white/15 tracking-wider">adm-primary</p>
        </div>
      </div>
    </div>
  )
}