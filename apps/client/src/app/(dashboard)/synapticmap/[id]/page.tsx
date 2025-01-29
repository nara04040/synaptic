import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SynapticMapClient } from "@/components/synaptic/core/SynapticMapClient"

interface SynapticMapPageProps {
  params: {
    id: string;
  }
}

export default function SynapticMapPage({ params }: SynapticMapPageProps) {
  return (
    <div className="container mx-auto py-6">
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-300">Synaptic Map</CardTitle>
          <CardDescription className="text-slate-400">
            지식을 시냅스처럼 연결하여 더 깊은 이해를 만드는 상호작용형 학습 맵입니다.
            노드를 클릭하여 연결된 개념들을 확인해보세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[900px] border border-slate-800 rounded-lg overflow-hidden">
            <SynapticMapClient mapId={params.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 