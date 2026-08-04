'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 flex items-center justify-center z-[9999]">
      <div className="text-center">
        <div className="mb-8 relative">
          <Heart 
            className="w-24 h-24 text-pink-500 mx-auto animate-pulse" 
            fill="currentColor"
          />
        </div>
        <h1 className="text-3xl font-bold text-pink-700 mb-4">Couple Hub</h1>
        <p className="text-pink-600 mb-8">Loading your romantic experience...</p>
        
        <div className="w-64 h-2 bg-pink-200 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="text-pink-500 mt-4 text-sm font-medium">{progress}%</p>
      </div>
    </div>
  )
}
