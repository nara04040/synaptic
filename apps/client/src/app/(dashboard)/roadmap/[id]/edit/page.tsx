import { PageHeader } from "@/components/shared/PageHeader"
import { RoadmapEditor } from "@/components/roadmap/editor/RoadmapEditor"

export default function RoadmapEditorPage() {
  return (
    <div className="space-y-6 max-w-[95vw] mx-auto">
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