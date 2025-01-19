import { PageHeader } from "@/components/shared/PageHeader"
import { SynapticMapForm } from "@/components/synaptic-map/SynapticMapForm"

export default function CreateSynapticMapPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Create Synaptic Map"
        description="Create a new synaptic map to visualize and connect your knowledge"
      />
      <SynapticMapForm />
    </div>
  )
} 