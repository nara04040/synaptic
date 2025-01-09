'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Notes', href: '/notes' },
  { name: 'Review', href: '/review' },
  { name: 'Blog', href: '/blog' },
]

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("border-r bg-background", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "transparent"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 