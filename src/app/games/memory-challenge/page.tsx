'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Brain, CheckCircle, XCircle, Image as ImageIcon } from 'lucide-react'

export default function MemoryChallengePage() {
  const router = useRouter()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [xpEarned, setXPEarned] = useState(0)

  // Mock memory challenge data
  const memoryChallenge = {
    image: '🏖️',
    question: 'Where was this picture taken?',
    options: ['Zanzibar', 'Arusha', 'Dar es Salaam', 'Bagamoyo'],
    correctAnswer: 'Zanzibar',
    hint: 'Think about our first Valentine\'s Day together...'
  }

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    
    setTimeout(() => {
      setShowResult(true)
      const isCorrect = answer === memoryChallenge.correctAnswer
      setXPEarned(isCorrect ? 20 : 5)
    }, 500)
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  const handlePlayAgain = () => {
    setSelectedAnswer(null)
    setShowResult(false)
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full mb-4">
            <Brain className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Memory Challenge</h1>
          <p className="text-gray-600">Test how well you remember your shared experiences!</p>
        </div>

        <div className="bg-love-50/90 rounded-2xl shadow-xl p-6 sm:p-8 border border-love-100">
          {!showResult ? (
            <>
              {/* Memory Image */}
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-12 mb-6 flex items-center justify-center border-2 border-dashed border-blue-300">
                <div className="text-center">
                  <div className="text-8xl mb-4">{memoryChallenge.image}</div>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <ImageIcon size={16} />
                    <span className="text-sm">Memory Photo</span>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                  {memoryChallenge.question}
                </h2>
                <p className="text-sm text-gray-500 text-center italic">
                  💡 {memoryChallenge.hint}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {memoryChallenge.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedAnswer === option
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50/50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="font-medium text-gray-800">{option}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-6">
              {/* Result Banner */}
              <div className={`rounded-xl p-6 border-2 text-center ${
                selectedAnswer === memoryChallenge.correctAnswer
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
                  : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-300'
              }`}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  {selectedAnswer === memoryChallenge.correctAnswer ? (
                    <CheckCircle className="text-green-500 w-8 h-8" />
                  ) : (
                    <XCircle className="text-orange-500 w-8 h-8" />
                  )}
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedAnswer === memoryChallenge.correctAnswer ? 'Correct!' : 'Not quite!'}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {selectedAnswer === memoryChallenge.correctAnswer
                    ? 'You have a great memory!'
                    : `The correct answer was ${memoryChallenge.correctAnswer}`}
                </p>
              </div>

              {/* XP Reward */}
              <div className={`rounded-xl p-6 border-2 text-center ${
                selectedAnswer === memoryChallenge.correctAnswer
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="text-4xl mb-2">⭐</div>
                <p className="text-2xl font-bold text-gray-800 mb-1">+{xpEarned} XP</p>
                <p className="text-sm text-gray-600">
                  {selectedAnswer === memoryChallenge.correctAnswer ? 'Memory master!' : 'Keep practicing!'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePlayAgain}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
      </main>
    </div>
  )
}
