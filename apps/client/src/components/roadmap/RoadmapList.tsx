"use client"

import { useRoadmapStore } from "@/store/slices/roadmapStore"
import { RoadmapCard } from "./RoadmapCard"
import { useEffect } from "react"

export function RoadmapList() {
  const { roadmaps, fetchRoadmaps, isLoading } = useRoadmapStore()

  useEffect(() => {
    fetchRoadmaps()
  }, [fetchRoadmaps])

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[200px] rounded-lg border bg-card animate-pulse" />
        ))}
      </div>
    )
  }

  if (!roadmaps.length) {
    return (
      <div className="rounded-lg border bg-card p-6">
        <p className="text-sm text-muted-foreground">No roadmaps created yet</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {roadmaps.map((roadmap) => (
        <RoadmapCard key={roadmap.id} roadmap={roadmap} />
      ))}
    </div>
  )
} 