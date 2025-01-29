import { useState } from 'react'

interface CreateMapInput {
  title: string
  description: string
}

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

export function useCreateMap() {
  const [isLoading, setIsLoading] = useState(false)

  const createMap = async (input: CreateMapInput): Promise<SynapticMapMetadata> => {
    setIsLoading(true)
    try {
      // TODO: API 연동 후 실제 데이터로 교체
      // 임시로 새 맵 생성하는 mock 함수
      const newMap: SynapticMapMetadata = {
        id: Math.random().toString(36).substr(2, 9),
        title: input.title,
        description: input.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        nodeCount: 0,
        edgeCount: 0,
        tags: [],
        isPublic: false
      }

      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500))

      return newMap
    } finally {
      setIsLoading(false)
    }
  }

  return { createMap, isLoading }
} 