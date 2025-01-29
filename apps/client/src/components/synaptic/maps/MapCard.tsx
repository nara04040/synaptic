import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface SynapticMapMetadata {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
  thumbnail?: string
  nodeCount: number
  edgeCount: number
  tags: string[]
  isPublic: boolean
}

interface MapCardProps {
  map: SynapticMapMetadata
}

export function MapCard({ map }: MapCardProps) {
  const router = useRouter()

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
      <CardHeader>
        <CardTitle className="text-slate-200">{map.title}</CardTitle>
        <p className="text-sm text-slate-400">{map.description}</p>
      </CardHeader>
      <CardContent>
        <div className="aspect-video rounded-md bg-slate-800 overflow-hidden">
          {map.thumbnail ? (
            <img 
              src={map.thumbnail} 
              alt={map.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600">
              No Preview
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-sm text-slate-400">
          <p>노드 {map.nodeCount}개</p>
          <p>마지막 수정: {formatDate(map.updatedAt)}</p>
        </div>
        <Button
          onClick={() => router.push(`/synapticmap/${map.id}`)}
          variant="secondary"
        >
          열기
        </Button>
      </CardFooter>
    </Card>
  )
} 