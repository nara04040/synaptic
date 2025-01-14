import { PageHeader } from "@/components/shared/PageHeader"
import { RoadmapList } from "@/components/roadmap/RoadmapList"
import { CreateRoadmapButton } from "@/components/roadmap/CreateRoadmapButton"

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Roadmaps"
          description="Create and manage your learning roadmaps"
        />
        <CreateRoadmapButton />
      </div>
      <RoadmapList />
    </div>
  )
} 