'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, RotateCw, Sparkles } from 'lucide-react'
import { spinWheelOptions } from '@/data/questions'

export default function SpinTheWheelPage() {
  const router = useRouter()
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedOption, setSelectedOption] = useState<any>(null)
  const [completed, setCompleted] = useState(false)
  const [xpEarned, setXPEarned] = useState(0)
  const [rotation, setRotation] = useState(0)

  const handleSpin = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setSelectedOption(null)
    
    // Calculate random rotation
    const spins = 5 + Math.random() * 5 // 5-10 full rotations
    const randomIndex = Math.floor(Math.random() * spinWheelOptions.length)
    const segmentAngle = 360 / spinWheelOptions.length
    const targetAngle = randomIndex * segmentAngle + segmentAngle / 2
    const totalRotation = rotation + (spins * 360) + (360 - targetAngle)
    
    setRotation(totalRotation)
    
    // Show result after animation
    setTimeout(() => {
      setSelectedOption(spinWheelOptions[randomIndex])
      setIsSpinning(false)
      
      // Calculate XP based on result
      let xp = 5
      if (spinWheelOptions[randomIndex].label === 'Double XP') {
        xp = 20
      }
      setXPEarned(xp)
    }, 4000)
  }

  const handleComplete = () => {
    setCompleted(true)
  }

  const handleBack = () => {
    router.push('/dashboard')
  }

  const handleSpinAgain = () => {
    setSelectedOption(null)
    setCompleted(false)
    setXPEarned(0)
  }

  const colors = [
    ['#f87171', '#dc2626'], // red
    ['#60a5fa', '#2563eb'], // blue
    ['#4ade80', '#16a34a'], // green
    ['#facc15', '#ca8a04'], // yellow
    ['#c084fc', '#9333ea'], // purple
    ['#f472b6', '#db2777'], // pink
    ['#818cf8', '#4f46e5'], // indigo
    ['#2dd4bf', '#0d9488'], // teal
    ['#fb923c', '#ea580c'], // orange
    ['#22d3ee', '#0891b2'], // cyan
  ]

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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-600 rounded-full mb-4">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Spin the Wheel</h1>
          <p className="text-gray-600">Let fate decide your next activity!</p>
        </div>

        <div className="bg-love-50/90 rounded-2xl shadow-xl p-6 sm:p-8 border border-love-100">
          {!selectedOption ? (
            <>
              {/* Wheel */}
              <div className="relative w-72 h-72 mx-auto mb-8">
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                  <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-gray-800"></div>
                </div>
                
                {/* SVG Wheel */}
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full rounded-full border-4 border-gray-800 shadow-2xl transition-transform duration-[4000ms] ease-out"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  {spinWheelOptions.map((option, index) => {
                    const angle = (index / spinWheelOptions.length) * 360
                    const segmentAngle = 360 / spinWheelOptions.length
                    const startAngle = angle - 90
                    const endAngle = startAngle + segmentAngle
                    const color = colors[index % colors.length]
                    
                    // Calculate SVG path for pie slice
                    const startRad = (startAngle * Math.PI) / 180
                    const endRad = (endAngle * Math.PI) / 180
                    const x1 = 100 + 95 * Math.cos(startRad)
                    const y1 = 100 + 95 * Math.sin(startRad)
                    const x2 = 100 + 95 * Math.cos(endRad)
                    const y2 = 100 + 95 * Math.sin(endRad)
                    
                    const pathData = `M 100 100 L ${x1} ${y1} A 95 95 0 0 1 ${x2} ${y2} Z`
                    
                    // Calculate text position
                    const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180
                    const textX = 100 + 60 * Math.cos(midAngle)
                    const textY = 100 + 60 * Math.sin(midAngle)
                    
                    return (
                      <g key={option.id}>
                        <defs>
                          <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: color[0] }} />
                            <stop offset="100%" style={{ stopColor: color[1] }} />
                          </linearGradient>
                        </defs>
                        <path
                          d={pathData}
                          fill={`url(#grad-${index})`}
                          stroke="#1f2937"
                          strokeWidth="2"
                        />
                        <text
                          x={textX}
                          y={textY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="20"
                          fill="white"
                          fontWeight="bold"
                          transform={`rotate(${angle + segmentAngle / 2 - 90}, ${textX}, ${textY})`}
                        >
                          {option.icon}
                        </text>
                      </g>
                    )
                  })}
                </svg>
                
                {/* Center */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-love-100 rounded-full border-4 border-gray-800 shadow-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-full"></div>
                </div>
              </div>

              {/* Spin Button */}
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isSpinning ? (
                  <>
                    <RotateCw className="animate-spin" size={20} />
                    <span>Spinning...</span>
                  </>
                ) : (
                  <>
                    <RotateCw size={20} />
                    <span>Spin the Wheel!</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="space-y-6">
              {!completed ? (
                <>
                  {/* Result */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-8 border-2 border-yellow-300 text-center">
                    <div className="text-6xl mb-4">{selectedOption.icon}</div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedOption.label}</h2>
                    <p className="text-gray-600">Complete this activity to earn XP!</p>
                  </div>

                  {/* Complete Button */}
                  <button
                    onClick={handleComplete}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Complete Activity
                  </button>
                </>
              ) : (
                <>
                  {/* Completion Banner */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300 text-center">
                    <div className="text-4xl mb-2">🎉</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Activity Complete!</h3>
                    <p className="text-gray-600">Great job completing the challenge!</p>
                  </div>

                  {/* XP Reward */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 text-center">
                    <div className="text-4xl mb-2">⭐</div>
                    <p className="text-2xl font-bold text-gray-800 mb-1">+{xpEarned} XP</p>
                    <p className="text-sm text-gray-600">
                      {selectedOption.label === 'Double XP' ? 'Double XP bonus!' : 'Keep spinning!'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleSpinAgain}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Spin Again
                    </button>
                    <button
                      onClick={handleBack}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      Back to Dashboard
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
