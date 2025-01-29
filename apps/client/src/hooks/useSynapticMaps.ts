import { useState, useEffect } from 'react'

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

export function useSynapticMaps() {
  const [maps, setMaps] = useState<SynapticMapMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: API 연동 후 실제 데이터로 교체
    const fetchMaps = async () => {
      try {
        // 임시 데이터
        const mockMaps: SynapticMapMetadata[] = [
          {
            id: '1',
            title: 'JavaScript 기초 개념',
            description: 'JavaScript의 핵심 개념과 동작 원리를 정리한 맵입니다.',
            createdAt: new Date('2024-03-01'),
            updatedAt: new Date('2024-03-15'),
            nodeCount: 12,
            edgeCount: 18,
            tags: ['javascript', 'programming'],
            isPublic: true
          },
          {
            id: '2',
            title: 'React 상태관리',
            description: 'React의 다양한 상태관리 방법과 패턴을 정리했습니다.',
            createdAt: new Date('2024-03-05'),
            updatedAt: new Date('2024-03-10'),
            nodeCount: 8,
            edgeCount: 12,
            tags: ['react', 'state-management'],
            isPublic: true
          },
          {
            id: '3',
            title: '디자인 패턴',
            description: '자주 사용되는 소프트웨어 디자인 패턴을 정리한 맵입니다.',
            createdAt: new Date('2024-03-08'),
            updatedAt: new Date('2024-03-12'),
            nodeCount: 15,
            edgeCount: 25,
            tags: ['design-patterns', 'architecture'],
            isPublic: false
          }
        ]

        setMaps(mockMaps)
        setIsLoading(false)
      } catch (error) {
        console.error('맵 목록 로드 실패:', error)
        setIsLoading(false)
      }
    }

    fetchMaps()
  }, [])

  return { maps, isLoading }
} 