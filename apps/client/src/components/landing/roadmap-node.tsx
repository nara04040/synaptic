import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, CheckCircle, Circle } from 'lucide-react'
import { Progress } from '@/components/landing/progress'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/landing/card'

interface RoadmapItem {
  id: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'locked'
  progress: number
}

interface RoadmapNodeProps {
  item: RoadmapItem
  isExpanded: boolean
  toggleNode: () => void
  isLast: boolean
}

export function RoadmapNode({ item, isExpanded, toggleNode, isLast }: RoadmapNodeProps) {
  const statusIcon = {
    completed: <CheckCircle className="text-red-500" />,
    'in-progress': <Circle className="text-blue-500" />,
    locked: <Circle className="text-gray-400" />,
  }

  return (
    <div className="relative">
      <Card className={`transition-shadow duration-300 ${isExpanded ? 'shadow-lg' : ''}`}>
        <CardHeader className="flex flex-row items-center cursor-pointer" onClick={toggleNode}>
          <div className="flex-1">
            <CardTitle className="text-lg">{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {statusIcon[item.status]}
            <ChevronRight
              className={`transition-transform duration-300 ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
          </div>
        </CardHeader>
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <CardContent className="pt-4">
            <Progress value={item.progress} className="mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Progress: {item.progress}%
            </p>
            {item.status !== 'locked' && (
              <Button variant="outline" size="sm">
                {item.status === 'completed' ? 'Review' : 'Continue'}
              </Button>
            )}
          </CardContent>
        </motion.div>
      </Card>
      {!isLast && (
        <div className="absolute left-6 top-full w-px h-4 bg-gray-300 dark:bg-gray-700" />
      )}
    </div>
  )
}

