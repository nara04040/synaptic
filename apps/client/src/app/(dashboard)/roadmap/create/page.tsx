import { PageHeader } from "@/components/shared/PageHeader"
import { RoadmapForm } from "@/components/roadmap/RoadmapForm"

export default function CreateRoadmapPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Create Roadmap"
        description="Create a new learning roadmap from scratch or use a template"
      />
      <RoadmapForm />
    </div>
  )
} 