'use client'

import { SynapticMap } from './SynapticMap'

interface SynapticMapClientProps {
  mapId: string
}

export function SynapticMapClient({ mapId }: SynapticMapClientProps) {
  return <SynapticMap mapId={mapId} />
} 