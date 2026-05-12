export default function LoginPage() {
  return (
    <div className="fixed inset-0 bg-[#0d0f11] flex items-center justify-center">
      <div className="w-full max-w-sm px-4">

        {/* Wordmark */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/90">
            AD<span className="text-[#3b7dd8]">A</span>MANTIUM
          </p>
          <p className="text-[9px] tracking-[0.12em] uppercase text-white/25 mt-1">
            Institutional Operations Platform
          </p>
        </div>

        {/* Card */}
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
                placeholder="username"
                className="w-full bg-[#0d0f11] border border-white/[0.07] text-[12px] text-white/80 placeholder:text-white/20 px-3 py-2 outline-none focus:border-[#3b7dd8]/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-[0.12em] text-white/35 mb-1.5">
                Passphrase
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#0d0f11] border border-white/[0.07] text-[12px] text-white/80 placeholder:text-white/20 px-3 py-2 outline-none focus:border-[#3b7dd8]/50 transition-colors"
              />
            </div>
          </div>

          <button className="w-full mt-5 bg-[#3b7dd8] hover:bg-[#2f6bbf] text-white text-[11px] font-medium tracking-[0.06em] uppercase py-2.5 transition-colors">
            Authenticate
          </button>

          <p className="text-[9px] text-white/20 tracking-wider mt-4 text-center">
            Access is role-restricted · ADMIN · REVIEWER · OPERATOR · AUDITOR · VIEWER
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-[9px] text-white/15 tracking-wider">Build · v0.1.0-alpha</p>
          <p className="text-[9px] text-white/15 tracking-wider">adm-primary</p>
        </div>

      </div>
    </div>
  )
}