'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useSocket } from '@/contexts/SocketContext'
import { ArrowLeft, Heart, Sparkles, User } from 'lucide-react'
import { dailyQuestions } from '@/data/questions'
import VoiceCall from '@/components/VoiceCall'

export default function DailyQuestionPage() {
  const router = useRouter()
  const { user, couple } = useAuth()
  const { socket } = useSocket()
  const [currentQuestion] = useState(dailyQuestions[Math.floor(Math.random() * dailyQuestions.length)])
  const [answer, setAnswer] = useState('')
  const [partnerAnswer, setPartnerAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [partnerSubmitted, setPartnerSubmitted] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [xpEarned, setXPEarned] = useState(0)
  const [partnerOnline, setPartnerOnline] = useState(false)

  useEffect(() => {
    if (!socket || !couple) return

    // Notify partner that we joined the game
    socket.emit('joined-game', {
      coupleId: couple.id,
      gameType: 'daily-question'
    })

    // Listen for partner joining the game
    socket.on('partner-joined-game', () => {
      setPartnerOnline(true)
    })

    // Listen for partner's answer
    socket.on('partner-answer', (data) => {
      setPartnerAnswer(data.answer)
      setPartnerSubmitted(true)
      
      // Show results if both have answered
      if (submitted) {
        setShowResult(true)
        setXPEarned(15)
      }
    })

    // Listen for partner leaving
    socket.on('partner-left-game', () => {
      setPartnerOnline(false)
    })

    return () => {
      // Notify partner that we left the game
      socket.emit('left-game', { coupleId: couple.id })
      socket.off('partner-joined-game')
      socket.off('partner-answer')
      socket.off('partner-left-game')
    }
  }, [socket, couple, submitted])

  const handleSubmit = () => {
    if (!answer.trim() || !couple) return
    setSubmitted(true)
    
    // Emit answer to partner
    socket?.emit('submit-answer', {
      coupleId: couple.id,
      userId: user?.id,
      answer: answer,
      questionId: currentQuestion.id
    })

    // Show results if partner already answered
    if (partnerSubmitted) {
      setShowResult(true)
      setXPEarned(15)
    }
  }

  const handleBack = () => {
    router.push('/dashboard')
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full mb-4">
            <Heart className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Daily Question</h1>
          <p className="text-gray-600">Answer today's meaningful question together</p>
          
          {/* Partner Status */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${partnerOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600">
              {partnerOnline ? 'Partner is online' : 'Waiting for partner...'}
            </span>
          </div>
        </div>

        <div className="bg-love-50/90 rounded-2xl shadow-xl p-6 sm:p-8 border border-love-100">
          {!showResult ? (
            <>
              {/* Question */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-pink-500 w-5 h-5" />
                  <span className="text-smfont-semibold text-pink-600">Today's Question</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              {!submitted ? (
                <>
                  {/* Answer Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Answer
                    </label>
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-pink-100 focus:border-pink-500 transition-all resize-none h-32"
                      rows={4}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={!answer.trim()}
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Submit Answer
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Waiting for your partner's answer...</p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Results */}
              <div className="space-y-6">
                {/* Your Answer */}
                <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="text-pink-500 w-5 h-5" />
                    <span className="font-semibold text-pink-700">Your Answer</span>
                  </div>
                  <p className="text-gray-800">{answer}</p>
                </div>

                {/* Partner's Answer */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="text-blue-500 w-5 h-5" />
                    <span className="font-semibold text-blue-700">Partner's Answer</span>
                  </div>
                  <p className="text-gray-800">{partnerAnswer}</p>
                </div>

                {/* XP Reward */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 text-center">
                  <div className="text-4xl mb-2">✨</div>
                  <p className="text-2xl font-bold text-gray-800 mb-1">+{xpEarned} XP</p>
                  <p className="text-sm text-gray-600">Keep the conversation going!</p>
                </div>

                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Back to Dashboard
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <VoiceCall />
    </div>
  )
}
