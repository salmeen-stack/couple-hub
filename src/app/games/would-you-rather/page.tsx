'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, HelpCircle, Heart, MessageCircle } from 'lucide-react'
import { wouldYouRatherQuestions } from '@/data/questions'

export default function WouldYouRatherPage() {
  const router = useRouter()
  const [currentQuestion] = useState(wouldYouRatherQuestions[Math.floor(Math.random() * wouldYouRatherQuestions.length)])
  const [yourChoice, setYourChoice] = useState<string | null>(null)
  const [partnerChoice, setPartnerChoice] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [xpEarned, setXPEarned] = useState(0)

  // Parse the question to extract options
  const parseOptions = (question: string) => {
    const match = question.match(/Would you rather\s+(.+?)\s+OR\s+(.+?)\?$/i)
    if (match) {
      return [match[1].trim(), match[2].trim()]
    }
    // Fallback for different formats
    const parts = question.split(/or/i).map(p => p.replace(/Would you rather\s*/i, '').replace(/\?$/, '').trim())
    return parts.length === 2 ? parts : [question, '']
  }

  const options = parseOptions(currentQuestion.question)

  const handleChoice = (choice: string) => {
    setYourChoice(choice)
    
    // Simulate partner's choice (random for demo)
    setTimeout(() => {
      const randomPartnerChoice = options[Math.floor(Math.random() * options.length)]
      setPartnerChoice(randomPartnerChoice)
      setShowResult(true)
      
      const isMatch = choice === randomPartnerChoice
      setXPEarned(isMatch ? 10 : 5)
    }, 1000)
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  const handlePlayAgain = () => {
    setYourChoice(null)
    setPartnerChoice(null)
    setShowResult(false)
    setXPEarned(0)
    // In real app, would load new question
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-teal-600 rounded-full mb-4">
            <HelpCircle className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Would You Rather</h1>
          <p className="text-gray-600">See if you and your partner think alike!</p>
        </div>

        <div className="bg-love-50/90 rounded-2xl shadow-xl p-6 sm:p-8 border border-love-100">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              {currentQuestion.category}
            </span>
          </div>

          {!showResult ? (
            <>
              {/* Question */}
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-relaxed text-center">
                  Would you rather...
                </h2>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleChoice(option)}
                    disabled={yourChoice !== null}
                    className={`group relative p-6 rounded-xl border-2 transition-all duration-300 ${
                      yourChoice === option
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        yourChoice === option
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300 group-hover:border-green-400'
                      }`}>
                        {yourChoice === option && (
                          <div className="w-3 h-3 bg-love-100 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-lg font-medium text-gray-800">{option}</p>
                    </div>
                  </button>
                ))}
              </div>

              {yourChoice && (
                <div className="text-center py-4">
                  <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-gray-600">Waiting for your partner's choice...</p>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-6">
              {/* Result Banner */}
              <div className={`rounded-xl p-6 border-2 text-center ${
                yourChoice === partnerChoice
                  ? 'bg-gradient-to-r from-pink-50 to-red-50 border-pink-300'
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300'
              }`}>
                <div className="text-4xl mb-2">
                  {yourChoice === partnerChoice ? '💕' : '🤔'}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {yourChoice === partnerChoice ? 'Perfect Match!' : 'Interesting!'}
                </h3>
                <p className="text-gray-600">
                  {yourChoice === partnerChoice
                    ? 'You both chose the same option!'
                    : 'You chose differently. Discuss why!'}
                </p>
              </div>

              {/* Choices Reveal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="text-green-500 w-5 h-5" />
                    <span className="font-semibold text-green-700">Your Choice</span>
                  </div>
                  <p className="text-gray-800">{yourChoice}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="text-blue-500 w-5 h-5" />
                    <span className="font-semibold text-blue-700">Partner's Choice</span>
                  </div>
                  <p className="text-gray-800">{partnerChoice}</p>
                </div>
              </div>

              {/* XP Reward */}
              <div className={`rounded-xl p-6 border-2 text-center ${
                yourChoice === partnerChoice
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="text-4xl mb-2">⭐</div>
                <p className="text-2xl font-bold text-gray-800 mb-1">+{xpEarned} XP</p>
                <p className="text-sm text-gray-600">
                  {yourChoice === partnerChoice ? 'Perfect match bonus!' : 'Keep exploring each other!'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePlayAgain}
                  className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
