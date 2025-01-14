"use client"

import { Roadmap } from "@/types/roadmap"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface RoadmapCardProps {
  roadmap: Roadmap
}

export function RoadmapCard({ roadmap }: RoadmapCardProps) {
  const router = useRouter()

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => router.push(`/roadmap/${roadmap.id}/edit`)}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{roadmap.title}</span>
          <Badge>{roadmap.category}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{roadmap.description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{roadmap.nodes.length} concepts</span>
          <span>Updated {formatDate(roadmap.updatedAt)}</span>
        </div>
      </CardContent>
    </Card>
  )
} 