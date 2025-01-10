"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, CheckCircle, Circle } from 'lucide-react'
import { Progress } from '@/components/landing/ui/progress'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/landing/card'
import { RoadmapNode } from './roadmap-node'

interface RoadmapItem {
  id: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'locked'
  progress: number
}

const roadmapData: RoadmapItem[] = [
  {
    id: '1',
    title: 'HTML Fundamentals',
    description: 'Learn the basics of HTML structure and tags',
    status: 'completed',
    progress: 100,
  },
  {
    id: '2',
    title: 'CSS Styling',
    description: 'Master CSS for layout and design',
    status: 'in-progress',
    progress: 60,
  },
  {
    id: '3',
    title: 'JavaScript Essentials',
    description: 'Understand core JavaScript concepts',
    status: 'in-progress',
    progress: 30,
  },
  {
    id: '4',
    title: 'React Basics',
    description: 'Get started with React components and state',
    status: 'locked',
    progress: 0,
  },
  {
    id: '5',
    title: 'Advanced React',
    description: 'Dive into hooks, context, and performance optimization',
    status: 'locked',
    progress: 0,
  },
]

export function MyRoadmap() {
  const [expandedNode, setExpandedNode] = useState<string | null>(null)

  const toggleNode = (id: string) => {
    setExpandedNode(expandedNode === id ? null : id)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Learning Roadmap</h1>
      <div className="space-y-4">
        {roadmapData.map((item, index) => (
          <RoadmapNode
            key={item.id}
            item={item}
            isExpanded={expandedNode === item.id}
            toggleNode={() => toggleNode(item.id)}
            isLast={index === roadmapData.length - 1}
          />
        ))}
      </div>
    </div>
  )
}

