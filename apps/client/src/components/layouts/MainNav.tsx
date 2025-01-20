'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/synaptic-map', label: 'Synaptic Map' },
  { href: '/dashboard/prototype', label: 'Prototype' },
  { href: '/notes', label: 'Notes' },
  { href: '/review', label: 'Review Center' },
  { href: '/blog', label: 'Blog' },
]

export function MainNav() {
  const pathname = usePathname()

  const getIsActive = (href: string) => {
    if (href === '/') {
      return pathname === href
    }
    
    // 현재 경로에서 동적 세그먼트를 제거하고 비교
    const currentPath = pathname.split('/').slice(0, 2).join('/')
    const navPath = href.split('/').slice(0, 2).join('/')
    
    return currentPath === navPath
  }

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            getIsActive(item.href)
              ? 'text-primary'
              : 'text-muted-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}




