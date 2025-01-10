import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/landing/card'
import { Progress } from '@/components/landing/progress'

const userData = {
  name: "Alex Chen",
  progress: {
    currentRoadmap: "Frontend Development",
    completion: 45,
    todayReviews: 5,
    streak: 7
  },
  recentNotes: [
    {
      title: "React Hooks",
      lastEdited: "2024-03-20",
      connections: 8
    }
  ],
  stats: {
    totalStudyTime: "24h",
    conceptsMastered: 32,
    reviewAccuracy: 89
  }
}

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Welcome back, {userData.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Roadmap</CardTitle>
            <CardDescription>{userData.progress.currentRoadmap}</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={userData.progress.completion} className="w-full" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{userData.progress.completion}% complete</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Today's Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userData.progress.todayReviews}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">items to review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Learning Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userData.progress.streak} days</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Keep it up!</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Notes</CardTitle>
          </CardHeader>
          <CardContent>
            {userData.recentNotes.map((note, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span>{note.title}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{note.connections} connections</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Learning Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Study Time</p>
                <p className="text-2xl font-bold">{userData.stats.totalStudyTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Concepts Mastered</p>
                <p className="text-2xl font-bold">{userData.stats.conceptsMastered}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Review Accuracy</p>
                <p className="text-2xl font-bold">{userData.stats.reviewAccuracy}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

