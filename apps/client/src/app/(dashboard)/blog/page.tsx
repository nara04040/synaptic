export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">
            Share your knowledge and insights
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          New Post
        </button>
      </div>

      <div className="grid gap-6">
        {/* Draft Posts */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Draft Posts</h2>
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <p className="text-sm text-muted-foreground">No draft posts</p>
            </div>
          </div>
        </div>

        {/* Published Posts */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Published Posts</h2>
          <div className="rounded-lg border bg-card">
            <div className="p-6">
              <p className="text-sm text-muted-foreground">No published posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 