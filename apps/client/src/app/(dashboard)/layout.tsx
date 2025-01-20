export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* <Header /> */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* <Sidebar className="w-64 hidden md:block" /> */}
        {/* <main className="flex-1 overflow-y-auto p-6"> */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 