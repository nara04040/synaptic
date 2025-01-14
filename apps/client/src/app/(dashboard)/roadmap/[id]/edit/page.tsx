import { PageHeader } from "@/components/shared/PageHeader"
import { RoadmapEditor } from "@/components/roadmap/editor/RoadmapEditor"

export default function RoadmapEditorPage() {
  return (
    <div className="space-y-6 w-full px-4">
      <PageHeader 
        heading="Edit Roadmap"
        description="Edit your roadmap using the visual editor"
      />
      <div className="w-full">
        <RoadmapEditor />
      </div>
    </div>
  )
} 