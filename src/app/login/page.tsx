'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Lock, Mail, Heart, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-love-50 via-white to-romantic-100 relative overflow-hidden px-4 sm:px-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-love-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 sm:w-80 sm:h-80 bg-dreamy-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80 bg-blush-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Floating Hearts */}
        <div className="floating-heart text-4xl text-love-400" style={{ left: '10%', animationDelay: '0s' }}>❤️</div>
        <div className="floating-heart text-3xl text-romantic-400" style={{ left: '20%', animationDelay: '2s' }}>💕</div>
        <div className="floating-heart text-5xl text-blush-400" style={{ left: '80%', animationDelay: '4s' }}>💖</div>
        <div className="floating-heart text-2xl text-love-300" style={{ left: '90%', animationDelay: '6s' }}>💗</div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="card transform transition-all duration-500 hover:shadow-2xl mx-auto card-hover">
          {/* Logo and Header */}
          <div className="text-center mb-6 sm:mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 mb-3 sm:mb-4 transform hover:scale-110 transition-transform duration-300 animate-heartbeat">
              <div className="w-full h-full bg-gradient-to-br from-love-400 via-romantic-500 to-blush-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="text-white w-12 h-12 sm:w-16 sm:h-16" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gradient-animated mb-2">Couple Hub</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 font-medium text-sm sm:text-base">Your Private Space Together</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <Sparkles className="text-love-500 animate-sparkle" size={16} />
              <span className="text-xs text-love-600 font-semibold">Play, Connect, Grow Together</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded-lg animate-shake text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-love-100 focus:border-love-500 transition-all duration-300 text-sm sm:text-base"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-700 transition-colors">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-love-100 focus:border-love-500 transition-all duration-300 text-sm sm:text-base"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-love-500 via-romantic-500 to-blush-500 gradient-animated text-white py-2.5 sm:py-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden text-sm sm:text-base button-glow"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 relative z-10">
                  <span>Sign In</span>
                  <Heart className="w-4 h-4 animate-heartbeat" />
                </div>
              )}
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer"></div>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-love-50 to-romantic-50 rounded-lg p-3 sm:p-4 animate-fade-in-up">
              <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">Demo Accounts</p>
              <div className="space-y-2 text-xs sm:text-sm">
                <div>
                  <p className="text-gray-600">
                    <span className="font-medium text-love-600">Partner 1:</span> partner1@couplehub.com
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <span className="font-medium text-love-600">Partner 2:</span> partner2@couplehub.com
                  </p>
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  Password: (any password works for demo)
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 sm:mt-6 text-center text-xs text-gray-500">
            <p>© 2026 Couple Hub. Made with ❤️</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
