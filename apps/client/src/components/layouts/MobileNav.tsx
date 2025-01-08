// src/components/layouts/MobileNav.tsx
'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/roadmaps', label: 'My Roadmaps' },
  { href: '/notes', label: 'Study Notes' },
  { href: '/review', label: 'Review Center' },
  { href: '/blog', label: 'Blog' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary px-2 py-1 rounded-md',
                pathname === item.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}