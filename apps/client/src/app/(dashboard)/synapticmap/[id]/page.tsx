'use client'

interface SynapticMapPageProps {
  params: {
    id: string
  }
}

export default function SynapticMapPage({ params }: SynapticMapPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Map Details</h1>
        <p className="text-muted-foreground">
          Explore and edit your knowledge map
        </p>
      </div>
    </div>
  )
} 