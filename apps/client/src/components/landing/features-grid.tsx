import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/landing/card'
import { Brain, NetworkIcon as Connection, Calendar, FileQuestion } from 'lucide-react'

const features = [
  {
    title: 'Smart Roadmaps',
    description: 'Personalized learning paths tailored to your goals and skill level.',
    icon: Brain,
  },
  {
    title: 'Knowledge Connection',
    description: 'Visualize and connect concepts across different domains.',
    icon: Connection,
  },
  {
    title: 'Scientific Review System',
    description: 'Optimize your learning with spaced repetition and active recall.',
    icon: Calendar,
  },
  {
    title: 'Interview Preparation',
    description: 'Practice with real interview questions and get AI-powered feedback.',
    icon: FileQuestion,
  },
]

export function FeaturesGrid() {
  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-700 dark:text-purple-400">Accelerate your learning</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to master development concepts
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Synaptic provides a comprehensive suite of tools to help you learn, connect, and retain knowledge effectively.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-700 dark:bg-purple-900">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <CardTitle className="mt-4 text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

