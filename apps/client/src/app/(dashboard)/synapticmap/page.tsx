'use client'

import { SynapticMap } from '@/components/nodes/SynapticMap'

export default function SynapticMapPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Synaptic Map</h1>
        <p className="text-muted-foreground">
          Visualize your knowledge connections
        </p>
      </div>
      <SynapticMap />
    </div>
  )
} 