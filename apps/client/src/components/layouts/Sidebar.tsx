'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Dispatch, SetStateAction } from 'react'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onOpenChange?: Dispatch<SetStateAction<boolean>>
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Notes', href: '/notes' },
  { name: 'Review', href: '/review' },
  { name: 'Blog', href: '/blog' },
]

export function Sidebar({ className, open, onOpenChange, ...props }: SidebarProps) {
  const pathname = usePathname()

  const SidebarContent = (
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
              onClick={() => onOpenChange?.(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <aside className={cn("hidden md:block border-r bg-background", className)} {...props}>
        {SidebarContent}
      </aside>

      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-[240px] sm:w-[240px]">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    </>
  )
} 