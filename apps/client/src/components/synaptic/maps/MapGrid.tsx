import { MapCard } from './MapCard'
import { useSynapticMaps } from '@/hooks/useSynapticMaps'

interface MapGridProps {
  searchQuery: string
}

export function MapGrid({ searchQuery }: MapGridProps) {
  const { maps, isLoading } = useSynapticMaps()
  
  const filteredMaps = maps?.filter(map => 
    map.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    map.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="bg-slate-800/50 rounded-lg h-[300px] animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (!filteredMaps?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">맵을 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMaps.map(map => (
        <MapCard key={map.id} map={map} />
      ))}
    </div>
  )
} 