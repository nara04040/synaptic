import { cn } from '@/lib/utils'

interface RootLayoutProps {
  children: React.ReactNode
  className?: string
}

export function RootLayout({ children, className }: RootLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <main className="relative flex min-h-screen flex-col">
        {children}
      </main>
    </div>
  )
}