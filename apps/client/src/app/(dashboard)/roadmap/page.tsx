export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roadmaps</h1>
          <p className="text-muted-foreground">
            Create and manage your learning roadmaps
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Create Roadmap
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Roadmap cards will be rendered here */}
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm text-muted-foreground">No roadmaps created yet</p>
        </div>
      </div>
    </div>
  )
} 