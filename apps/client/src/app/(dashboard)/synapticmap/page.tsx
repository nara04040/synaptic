'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

// 임시 데이터 - 나중에 API로 대체
const synapticMaps = [
  {
    id: '1',
    title: 'JavaScript Core Concepts',
    description: '자바스크립트의 핵심 개념들을 시냅스처럼 연결한 맵',
    updatedAt: '2024-01-19'
  },
  {
    id: '2',
    title: 'React Ecosystem',
    description: 'React와 관련된 라이브러리, 도구들의 연결 관계',
    updatedAt: '2024-01-18'
  }
]

export default function SynapticMapListPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-300">Synaptic Maps</h1>
          <p className="text-sm text-slate-400">
            Create and manage your knowledge connections
          </p>
        </div>
        <Link href="/synaptic-map/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Map
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {synapticMaps.map((map) => (
          <Link key={map.id} href={`/synapticmap/${map.id}`}>
            <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
              <CardHeader>
                <CardTitle className="text-slate-300">{map.title}</CardTitle>
                <CardDescription className="text-slate-400">
                  {map.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">
                  Last updated: {map.updatedAt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
} 