export default function NotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Notes</h1>
          <p className="text-muted-foreground">
            Organize and manage your learning notes
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Create Note
        </button>
      </div>

      <div className="grid gap-4">
        <div className="flex items-center justify-between rounded-lg border bg-card p-4">
          <div className="grid gap-1">
            <p className="text-sm text-muted-foreground">No notes created yet</p>
          </div>
        </div>
      </div>
    </div>
  )
} 