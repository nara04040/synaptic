export default function ReviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Review System</h1>
        <p className="text-muted-foreground">
          Track and manage your learning reviews
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Due Reviews */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Due Reviews</h2>
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <p className="text-sm text-muted-foreground">No reviews due today</p>
            </div>
          </div>
        </div>

        {/* Upcoming Reviews */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Reviews</h2>
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <p className="text-sm text-muted-foreground">No upcoming reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 