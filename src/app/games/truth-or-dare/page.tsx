'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, MessageCircle, Target, Sparkles } from 'lucide-react'
import { truthQuestions, dareQuestions } from '@/data/questions'

export default function TruthOrDarePage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<'truth' | 'dare' | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [completed, setCompleted] = useState(false)
  const [xpEarned, setXPEarned] = useState(0)

  const categories = [
    { id: 'truth', name: 'Truth', icon: MessageCircle, color: 'from-purple-400 to-purple-600', bgColor: 'bg-purple-50' },
    { id: 'dare', name: 'Dare', icon: Target, color: 'from-pink-400 to-pink-600', bgColor: 'bg-pink-50' },
  ]

  const handleTypeSelect = (type: 'truth' | 'dare') => {
    setSelectedType(type)
    const questions = type === 'truth' ? truthQuestions : dareQuestions
    setCurrentQuestion(questions[Math.floor(Math.random() * questions.length)])
  }

  const handleComplete = () => {
    setCompleted(true)
    setXPEarned(selectedType === 'dare' ? 25 : 10)
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  const handlePlayAgain = () => {
    setSelectedType(null)
    setCurrentQuestion(null)
    setCompleted(false)
    setXPEarned(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-love-100 via-romantic-50 to-blush-100">
      {/* Header */}
      <header className="bg-love-50/80 backdrop-blur-lg border-b border-love-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mb-4">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Truth or Dare</h1>
          <p className="text-gray-600">Choose your challenge!</p>
        </div>

        {!selectedType ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleTypeSelect(category.id as 'truth' | 'dare')}
                className={`group relative bg-love-50/90 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">
                    {category.id === 'truth' ? 'Answer honestly' : 'Complete the challenge'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-love-50/90 rounded-2xl shadow-xl p-6 sm:p-8 border border-love-100">
            {!completed ? (
              <>
                {/* Category Badge */}
                <div className="mb-6">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    selectedType === 'truth' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-pink-100 text-pink-700'
                  }`}>
                    {selectedType === 'truth' ? '🎭 Truth' : '🎯 Dare'}
                  </span>
                  <span className="ml-3 text-sm text-gray-500">
                    {currentQuestion?.category}
                  </span>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-relaxed">
                    {currentQuestion?.question}
                  </h2>
                </div>

                {/* Complete Button */}
                <button
                  onClick={handleComplete}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {selectedType === 'truth' ? 'Answer Truth' : 'Complete Dare'}
                </button>

                {/* Change Selection */}
                <button
                  onClick={() => setSelectedType(null)}
                  className="w-full mt-4 py-3 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Choose Different
                </button>
              </>
            ) : (
              <div className="space-y-6">
                {/* Completion Banner */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Challenge Complete!</h3>
                  <p className="text-gray-600">
                    {selectedType === 'truth' 
                      ? 'Thank you for sharing!' 
                      : 'Great job completing the dare!'}
                  </p>
                </div>

                {/* XP Reward */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 text-center">
                  <div className="text-4xl mb-2">⭐</div>
                  <p className="text-2xl font-bold text-gray-800 mb-1">+{xpEarned} XP</p>
                  <p className="text-sm text-gray-600">
                    {selectedType === 'dare' ? 'Dare completed!' : 'Truth told!'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handlePlayAgain}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={handleBack}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
