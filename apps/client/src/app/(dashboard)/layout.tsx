import { Header } from '@/components/layouts/Header'
import { Sidebar } from '@/components/layouts/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* <Header /> */}
      <div className="flex h-[calc(100vh-4rem)] px-20">
        {/* <Sidebar className="w-64 hidden md:block" /> */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 