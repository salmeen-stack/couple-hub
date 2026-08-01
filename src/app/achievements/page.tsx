'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Trophy, Lock, Star } from 'lucide-react'
import { achievements } from '@/data/questions'

export default function AchievementsPage() {
  const router = useRouter()

  // Mock user achievements progress
  const userProgress = {
    'a1': { progress: 1, unlocked: true, unlockedAt: '2024-07-15' },
    'a2': { progress: 18, unlocked: false },
    'a3': { progress: 25, unlocked: false },
    'a4': { progress: 8, unlocked: false },
    'a5': { progress: 15, unlocked: false },
    'a6': { progress: 10, unlocked: false },
    'a7': { progress: 5, unlocked: false },
    'a8': { progress: 12, unlocked: false },
    'a9': { progress: 3, unlocked: false },
    'a10': { progress: 12, unlocked: false },
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  const unlockedCount = Object.values(userProgress).filter(p => p.unlocked).length
  const totalCount = achievements.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-love-100 via-romantic-50 to-blush-100">
      {/* Header */}
      <header className="bg-love-50/80 backdrop-blur-lg border-b border-love-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full mb-4">
            <Trophy className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Achievements</h1>
          <p className="text-gray-600">Track your progress and unlock rewards</p>
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-love-50 to-romantic-50 rounded-2xl p-6 mb-8 border border-love-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-800">{unlockedCount}/{totalCount}</p>
              <p className="text-sm text-gray-600">Unlocked</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{totalCount - unlockedCount}</p>
              <p className="text-sm text-gray-600">Remaining</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{Math.round((unlockedCount / totalCount) * 100)}%</p>
              <p className="text-sm text-gray-600">Complete</p>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => {
            const progress = userProgress[achievement.id as keyof typeof userProgress]
            const isUnlocked = progress?.unlocked || false
            const currentProgress = progress?.progress || 0
            const progressPercent = Math.min((currentProgress / achievement.requirement) * 100, 100)

            return (
              <div
                key={achievement.id}
                className={`bg-love-50/90 rounded-2xl shadow-lg overflow-hidden border transition-all hover:-translate-y-1 ${
                  isUnlocked
                    ? 'border-yellow-300 hover:shadow-xl'
                    : 'border-gray-200 hover:shadow-lg opacity-75'
                }`}
              >
                {/* Achievement Header */}
                <div className={`p-6 ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`text-4xl ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    {isUnlocked ? (
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={16} className="fill-yellow-500" />
                        <span className="text-xs font-semibold">Unlocked</span>
                      </div>
                    ) : (
                      <Lock className="text-gray-400 w-5 h-5" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>

                {/* Progress Bar */}
                <div className="p-4 bg-love-50">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className={`font-semibold ${isUnlocked ? 'text-green-600' : 'text-gray-800'}`}>
                      {currentProgress}/{achievement.requirement}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                          : 'bg-gradient-to-r from-blue-400 to-blue-600'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                  {isUnlocked && 'unlockedAt' in progress && progress.unlockedAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Unlocked on {new Date(progress.unlockedAt as string).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
