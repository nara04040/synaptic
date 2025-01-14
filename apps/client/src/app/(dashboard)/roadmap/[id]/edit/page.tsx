import { PageHeader } from "@/components/shared/PageHeader"
import { RoadmapEditor } from "@/components/roadmap/editor/RoadmapEditor"

export default function RoadmapEditorPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Edit Roadmap"
        description="Edit your roadmap using the visual editor"
      />
      <RoadmapEditor />
    </div>
  )
} 