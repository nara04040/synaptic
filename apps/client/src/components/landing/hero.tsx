import { Button } from '@/components/ui/button'
import { Badge } from '@/components/landing/badge'
import { NetworkVisualization } from '@/components/landing/network-visualization'

export function Hero() {
  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Connect Your</span>{' '}
                <span className="block text-purple-700 dark:text-purple-400 xl:inline">Developer Knowledge</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Build your personal knowledge map and master technical concepts
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button size="lg">
                    Start Learning
                  </Button>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 sm:justify-center lg:justify-start">
                <Badge variant="secondary">AI-Powered</Badge>
                <Badge variant="secondary">Interactive Learning</Badge>
                <Badge variant="secondary">Smart Review</Badge>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <NetworkVisualization />
      </div>
    </div>
  )
}

