'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/roadmap', label: 'Roadmaps' },
  { href: '/dashboard/prototype', label: 'Prototype' },
  { href: '/notes', label: 'Notes' },
  { href: '/review', label: 'Review Center' },
  { href: '/blog', label: 'Blog' },
]

export function MainNav() {
  const pathname = usePathname()

  const getIsActive = (href: string) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const hrefSegments = href.split('/').filter(Boolean);

    if (href === '/') {
      return pathname === href
    }

    return pathSegments[0] === hrefSegments[0]
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




