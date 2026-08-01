'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useSocket } from '@/contexts/SocketContext'
import { ArrowLeft, Target, CheckCircle, XCircle, User, Heart, MessageCircle, Send, Mic, MicOff } from 'lucide-react'
import { guessQuestions } from '@/data/questions'
import VoiceCall from '@/components/VoiceCall'

export default function GuessMyAnswerPage() {
  const router = useRouter()
  const { user, couple } = useAuth()
  const { socket } = useSocket()
  const [currentQuestion] = useState(guessQuestions[Math.floor(Math.random() * guessQuestions.length)])
  const [phase, setPhase] = useState<'answer' | 'guess' | 'result'>('answer')
  const [partnerAnswer, setPartnerAnswer] = useState('')
  const [guess, setGuess] = useState('')
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null)
  const [xpEarned, setXPEarned] = useState(0)
  const [partnerOnline, setPartnerOnline] = useState(false)
  const [isPartnerAnswering, setIsPartnerAnswering] = useState(false)

  useEffect(() => {
    if (!socket || !couple) return

    // Notify partner that we joined the game
    socket.emit('joined-game', {
      coupleId: couple.id,
      gameType: 'guess-my-answer'
    })

    // Listen for partner joining the game
    socket.on('partner-joined-game', () => {
      setPartnerOnline(true)
    })

    // Listen for partner's secret answer
    socket.on('partner-secret-answer', (data) => {
      setPartnerAnswer(data.answer)
      setIsPartnerAnswering(false)
      setPhase('guess')
    })

    // Listen for partner's guess
    socket.on('partner-guess', (data) => {
      // Handle partner's guess if we're the one who submitted the secret answer
      const isCorrect = data.guess.toLowerCase().includes(partnerAnswer.toLowerCase()) || 
                       partnerAnswer.toLowerCase().includes(data.guess.toLowerCase())
      
      setResult(isCorrect ? 'correct' : 'incorrect')
      setPhase('result')
      setXPEarned(isCorrect ? 20 : 5)
      
      // Send result back to partner
      socket.emit('guess-result', {
        coupleId: couple.id,
        result: isCorrect ? 'correct' : 'incorrect',
        xpEarned: isCorrect ? 20 : 5,
        partnerGuess: data.guess,
        secretAnswer: partnerAnswer
      })
    })

    // Listen for guess result
    socket.on('guess-result', (data) => {
      setResult(data.result)
      setPhase('result')
      setXPEarned(data.xpEarned)
      setGuess(data.partnerGuess)
      setPartnerAnswer(data.secretAnswer)
    })

    // Listen for partner leaving
    socket.on('partner-left-game', () => {
      setPartnerOnline(false)
    })

    // Listen for partner typing
    socket.on('partner-typing', (isTyping) => {
      setIsPartnerAnswering(isTyping)
    })

    return () => {
      socket.emit('left-game', { coupleId: couple.id })
      socket.off('partner-joined-game')
      socket.off('partner-secret-answer')
      socket.off('partner-guess')
      socket.off('guess-result')
      socket.off('partner-left-game')
      socket.off('partner-typing')
    }
  }, [socket, couple, partnerAnswer])

  const handlePartnerSubmit = () => {
    if (!partnerAnswer.trim() || !couple || !socket) return
    
    // Emit secret answer to partner
    socket.emit('submit-secret-answer', {
      coupleId: couple.id,
      userId: user?.id,
      answer: partnerAnswer,
      questionId: currentQuestion.id
    })
    
    setIsPartnerAnswering(false)
    setPhase('guess')
  }

  const handleGuessSubmit = () => {
    if (!guess.trim() || !couple || !socket) return
    
    // Emit guess to partner
    socket.emit('submit-guess', {
      coupleId: couple.id,
      userId: user?.id,
      guess: guess,
      questionId: currentQuestion.id
    })
  }

  // Emit typing indicator
  const handleTyping = (isTyping: boolean, field: 'answer' | 'guess') => {
    if (!couple || !socket) return
    socket.emit('typing', {
      coupleId: couple.id,
      userId: user?.id,
      isTyping,
      field
    })
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  const handlePlayAgain = () => {
    setPhase('answer')
    setPartnerAnswer('')
    setGuess('')
    setResult(null)
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4">
            <Target className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Guess My Answer</h1>
          <p className="text-gray-600">How well do you know your partner?</p>
          
          {/* Partner Status */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className={`w-2 h-2 rounded-full ${partnerOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600">
              {partnerOnline ? 'Partner is online' : 'Waiting for partner...'}
            </span>
          </div>
        </div>

        <div className="bg-love-50/90 rounded-2xl shadow-xl p-6 sm:p-8 border border-love-100">
          {/* Question */}
          <div className="mb-8">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              {currentQuestion.category}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {phase === 'answer' && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Partner's Secret Answer
                </label>
                <textarea
                  value={partnerAnswer}
                  onChange={(e) => {
                    setPartnerAnswer(e.target.value)
                    handleTyping(e.target.value.length > 0, 'answer')
                  }}
                  placeholder="Your partner won't see this..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none h-32"
                  rows={4}
                />
                {isPartnerAnswering && (
                  <div className="mt-2 text-sm text-blue-600 animate-pulse">
                    Partner is typing...
                  </div>
                )}
              </div>
              <button
                onClick={handlePartnerSubmit}
                disabled={!partnerAnswer.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Submit Secret Answer
              </button>
            </>
          )}

          {phase === 'guess' && (
            <>
              <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Partner has answered!</span> Now it's your turn to guess their answer.
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Guess
                </label>
                <textarea
                  value={guess}
                  onChange={(e) => {
                    setGuess(e.target.value)
                    handleTyping(e.target.value.length > 0, 'guess')
                  }}
                  placeholder="What do you think they answered?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none h-32"
                  rows={4}
                />
                {isPartnerAnswering && (
                  <div className="mt-2 text-sm text-blue-600 animate-pulse">
                    Partner is typing...
                  </div>
                )}
              </div>
              <button
                onClick={handleGuessSubmit}
                disabled={!guess.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Submit Guess
              </button>
            </>
          )}

          {phase === 'result' && (
            <div className="space-y-6">
              {/* Result Banner */}
              <div className={`rounded-xl p-6 border-2 ${
                result === 'correct' 
                  ? 'bg-green-50 border-green-300' 
                  : 'bg-orange-50 border-orange-300'
              }`}>
                <div className="flex items-center justify-center gap-3 mb-2">
                  {result === 'correct' ? (
                    <CheckCircle className="text-green-500 w-8 h-8" />
                  ) : (
                    <XCircle className="text-orange-500 w-8 h-8" />
                  )}
                  <h3 className="text-2xl font-bold text-gray-800">
                    {result === 'correct' ? 'Correct!' : 'Not quite!'}
                  </h3>
                </div>
                <p className="text-center text-gray-600">
                  {result === 'correct' 
                    ? 'You really know your partner!' 
                    : 'Close, but not exactly right.'}
                </p>
              </div>

              {/* Answers Reveal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <p className="text-sm font-semibold text-blue-700 mb-2">Your Guess</p>
                  <p className="text-gray-800">{guess}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <p className="text-sm font-semibold text-purple-700 mb-2">Partner's Answer</p>
                  <p className="text-gray-800">{partnerAnswer}</p>
                </div>
              </div>

              {/* XP Reward */}
              <div className={`rounded-xl p-6 border-2 text-center ${
                result === 'correct'
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="text-4xl mb-2">{result === 'correct' ? '🎉' : '💪'}</div>
                <p className="text-2xl font-bold text-gray-800 mb-1">+{xpEarned} XP</p>
                <p className="text-sm text-gray-600">
                  {result === 'correct' ? '+5 Hearts bonus!' : 'Keep practicing!'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handlePlayAgain}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
      <VoiceCall />
    </div>
  )
}
