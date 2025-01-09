import { useAuthStore } from '@/store/slices/authStore'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your personal learning dashboard
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Roadmaps</h3>
            <p className="text-sm text-muted-foreground">
              0 active roadmaps
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Notes</h3>
            <p className="text-sm text-muted-foreground">
              0 study notes
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Reviews</h3>
            <p className="text-sm text-muted-foreground">
              0 pending reviews
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Blog Posts</h3>
            <p className="text-sm text-muted-foreground">
              0 published posts
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 