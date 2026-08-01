'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useSocket } from '@/contexts/SocketContext'
import { useRouter } from 'next/navigation'
import { Heart, Flame, Star, Trophy, BookOpen, Mail, LogOut, Gamepad2 } from 'lucide-react'
import { calculateLevel, xpForNextLevel, getLevelTitle, formatXP } from '@/lib/utils'
import { useEffect, useState } from 'react'
import VoiceCall from '@/components/VoiceCall'

export default function DashboardPage() {
  const { user, couple, logout } = useAuth()
  const { socket } = useSocket()
  const router = useRouter()
  const [partnerOnline, setPartnerOnline] = useState(false)

  useEffect(() => {
    if (!socket || !couple) return

    // Listen for real-time couple updates
    socket.on('couple-updated', (updatedCouple) => {
      // This would update the couple state in AuthContext
      console.log('Couple updated:', updatedCouple)
    })

    // Listen for real-time memory updates
    socket.on('memory-updated', (memory) => {
      console.log('Memory updated:', memory)
    })

    // Listen for real-time love note updates
    socket.on('love-note-updated', (note) => {
      console.log('Love note updated:', note)
    })

    // Listen for game activity
    socket.on('game-activity', (activity) => {
      console.log('Game activity:', activity)
    })

    // Listen for user typing
    socket.on('user-typing', ({ userId, isTyping }) => {
      console.log(`User ${userId} is typing: ${isTyping}`)
    })

    // Listen for user joined/left
    socket.on('user-joined', ({ socketId }) => {
      console.log('User joined:', socketId)
      setPartnerOnline(true)
    })

    socket.on('user-left', ({ socketId }) => {
      console.log('User left:', socketId)
      setPartnerOnline(false)
    })

    return () => {
      socket.off('couple-updated')
      socket.off('memory-updated')
      socket.off('love-note-updated')
      socket.off('game-activity')
      socket.off('user-typing')
      socket.off('user-joined')
      socket.off('user-left')
    }
  }, [socket, couple])

  if (!user || !couple) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-love-100 via-romantic-50 to-blush-100">
        <div className="animate-spin w-12 h-12 border-4 border-love-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  const currentLevel = calculateLevel(couple.totalXP)
  const xpForNext = xpForNextLevel(currentLevel)
  const xpProgress = ((couple.totalXP % 100) / 100) * 100

  const games = [
    { id: 'guess-my-answer', name: 'Guess My Answer', icon: '🎯', color: 'from-blue-400 to-blue-600' },
    { id: 'daily-question', name: 'Daily Question', icon: '❤️', color: 'from-pink-400 to-pink-600' },
    { id: 'truth-or-dare', name: 'Truth or Dare', icon: '😂', color: 'from-purple-400 to-purple-600' },
    { id: 'memory-challenge', name: 'Memory Challenge', icon: '🧠', color: 'from-yellow-400 to-yellow-600' },
    { id: 'would-you-rather', name: 'Would You Rather', icon: '🤔', color: 'from-green-400 to-green-600' },
    { id: 'spin-the-wheel', name: 'Spin the Wheel', icon: '🎡', color: 'from-red-400 to-red-600' },
  ]

  const handleGameClick = (gameId: string) => {
    router.push(`/games/${gameId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-love-100 via-romantic-50 to-blush-100 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-heart text-3xl text-love-300" style={{ left: '5%', animationDelay: '0s' }}>❤️</div>
        <div className="floating-heart text-2xl text-romantic-300" style={{ left: '15%', animationDelay: '3s' }}>💕</div>
        <div className="floating-heart text-4xl text-blush-300" style={{ left: '85%', animationDelay: '5s' }}>💖</div>
        <div className="floating-heart text-2xl text-love-200" style={{ left: '95%', animationDelay: '7s' }}>💗</div>
      </div>

      {/* Header */}
      <header className="bg-love-50/80 backdrop-blur-lg border-b border-love-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-love-500 via-romantic-500 to-blush-500 rounded-full flex items-center justify-center animate-heartbeat">
                <Heart className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient-animated">Couple Hub</h1>
                <p className="text-xs text-gray-700">Welcome back, {user.name}!</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Level Card */}
          <div className="bg-love-50/90 rounded-xl p-6 shadow-lg border border-love-100 hover:shadow-xl transition-shadow card-hover">
            <div className="flex items-center justify-between mb-4">
              <Flame className="text-love-500 w-8 h-8 animate-pulse-slow" />
              <span className="text-2xl font-bold text-gray-900">{currentLevel}</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">Couple Level</p>
            <p className="text-xs text-love-700 font-medium">{getLevelTitle(currentLevel)}</p>
          </div>

          {/* XP Card */}
          <div className="bg-romantic-50/90 rounded-xl p-6 shadow-lg border border-romantic-100 hover:shadow-xl transition-shadow card-hover">
            <div className="flex items-center justify-between mb-4">
              <Star className="text-romantic-500 w-8 h-8 animate-sparkle" />
              <span className="text-2xl font-bold text-gray-900">{formatXP(couple.totalXP)}</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">Total XP</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-love-500 via-romantic-500 to-blush-500 gradient-animated h-2 rounded-full transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">{formatXP(xpForNext - couple.totalXP)} XP to next level</p>
          </div>

          {/* Streak Card */}
          <div className="bg-blush-50/90 rounded-xl p-6 shadow-lg border border-blush-100 hover:shadow-xl transition-shadow card-hover">
            <div className="flex items-center justify-between mb-4">
              <Heart className="text-blush-500 w-8 h-8 animate-heartbeat" />
              <span className="text-2xl font-bold text-gray-900">{couple.streak}</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">Love Streak</p>
            <p className="text-xs text-gray-600">Days of connection</p>
          </div>

          {/* Partner Card */}
          <div className="bg-dreamy-50/90 rounded-xl p-6 shadow-lg border border-dreamy-100 hover:shadow-xl transition-shadow card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-love-400 via-romantic-400 to-blush-400 flex items-center justify-center animate-pulse-slow">
                <span className="text-white font-bold">{couple.partnerTwo?.name?.charAt(0) || '?'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${partnerOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-xs text-love-600 font-medium animate-sparkle">
                  {partnerOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2">Partner</p>
            <p className="text-sm font-semibold text-gray-900">{couple.partnerTwo?.name || 'Not paired'}</p>
          </div>
        </div>

        {/* Games Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Gamepad2 className="text-love-600 w-6 h-6 animate-wiggle" />
            <h2 className="text-2xl font-bold text-gradient-animated">Today's Games</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => handleGameClick(game.id)}
                className="group relative bg-love-50/90 rounded-xl p-6 shadow-lg border border-love-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden card-hover"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative">
                  <div className="text-4xl mb-3 animate-float">{game.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{game.name}</h3>
                  <p className="text-xs text-gray-700">Click to play</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/memories')}
            className="flex items-center gap-4 bg-romantic-50/90 rounded-xl p-6 shadow-lg border border-romantic-100 hover:shadow-xl transition-all hover:-translate-y-1 card-hover"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-love-400 via-romantic-500 to-blush-500 rounded-lg flex items-center justify-center animate-float-slow">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Memory Book</h3>
              <p className="text-xs text-gray-700">View your shared memories</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/love-notes')}
            className="flex items-center gap-4 bg-blush-50/90 rounded-xl p-6 shadow-lg border border-blush-100 hover:shadow-xl transition-all hover:-translate-y-1 card-hover"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-passion-400 via-love-500 to-blush-500 rounded-lg flex items-center justify-center animate-float-slow" style={{ animationDelay: '1s' }}>
              <Mail className="text-white w-6 h-6" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Love Notes</h3>
              <p className="text-xs text-gray-700">Send and receive messages</p>
            </div>
          </button>
        </div>

        {/* Achievements Preview */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="text-romantic-500 w-6 h-6 animate-sparkle" />
            <h2 className="text-2xl font-bold text-gradient-animated">Achievements</h2>
          </div>
          <div className="bg-dreamy-50/90 rounded-xl p-6 shadow-lg border border-dreamy-100 card-hover">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center transform hover:scale-110 transition-transform">
                <div className="text-3xl mb-2 animate-float">🏆</div>
                <p className="text-xs text-gray-700">First Win</p>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform">
                <div className="text-3xl mb-2 animate-float" style={{ animationDelay: '0.5s' }}>❤️</div>
                <p className="text-xs text-gray-700">30-Day Streak</p>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform">
                <div className="text-3xl mb-2 animate-float" style={{ animationDelay: '1s' }}>😂</div>
                <p className="text-xs text-gray-700">Dare Devil</p>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform">
                <div className="text-3xl mb-2 animate-float" style={{ animationDelay: '1.5s' }}>🧠</div>
                <p className="text-xs text-gray-700">Memory Master</p>
              </div>
              <div className="text-center transform hover:scale-110 transition-transform">
                <div className="text-3xl mb-2 animate-float" style={{ animationDelay: '2s' }}>🎯</div>
                <p className="text-xs text-gray-700">Guess Champion</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/achievements')}
              className="w-full mt-4 py-2 text-sm text-love-600 hover:text-love-800 font-medium transition-colors"
            >
              View All Achievements →
            </button>
          </div>
        </div>
      </main>
      <VoiceCall />
    </div>
  )
}
