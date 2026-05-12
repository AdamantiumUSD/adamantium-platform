'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_SECTIONS = [
  {
    label: 'Core',
    items: [
      { href: '/dashboard', label: 'Dashboard', badge: null,  badgeVariant: null },
      { href: '/workflows', label: 'Workflows',  badge: '3',   badgeVariant: 'alert' },
      { href: '/audit',     label: 'Audit Log',  badge: '124', badgeVariant: 'ok' },
    ],
  },
  {
    label: 'Finance',
    items: [
      { href: '/treasury', label: 'Treasury', badge: null, badgeVariant: null },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/settings', label: 'Settings', badge: null, badgeVariant: null },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="w-[200px] bg-[#131618] border-r border-white/[0.07] flex flex-col shrink-0 overflow-y-auto">
      {NAV_SECTIONS.map((section) => (
        <div key={section.label} className="pt-4 pb-2">
          <p className="px-4 pb-1.5 text-[9px] tracking-[0.16em] uppercase text-white/25">
            {section.label}
          </p>
          {section.items.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  'flex items-center gap-2.5 px-4 py-[7px] text-[12px] tracking-[0.03em]',
                  'border-l-2 transition-colors duration-100',
                  isActive
                    ? 'bg-blue-950/30 text-[#3b7dd8] border-[#3b7dd8]'
                    : 'text-white/50 border-transparent hover:bg-white/[0.03] hover:text-white/80',
                ].join(' ')}
              >
                {item.label}
                {item.badge && (
                  <span
                    className={[
                      'ml-auto text-[9px] tracking-wider px-1.5 py-px rounded-sm',
                      item.badgeVariant === 'alert'
                        ? 'bg-red-950/40 text-red-400 border border-red-800/30'
                        : 'bg-green-950/30 text-green-500 border border-green-800/20',
                    ].join(' ')}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      ))}

      <div className="mt-auto border-t border-white/[0.07] px-4 py-3">
        <p className="text-[9px] text-white/20 tracking-wider">Build · v0.1.0-alpha</p>
        <p className="text-[9px] text-white/20 tracking-wider mt-0.5">Node · adm-primary</p>
      </div>
    </nav>
  )
}