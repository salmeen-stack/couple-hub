'use client'

import { useState, useEffect } from 'react'
import LoadingScreen from './LoadingScreen'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Wait for page to fully load
    if (document.readyState === 'complete') {
      const timer = setTimeout(() => setIsLoading(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return <>{children}</>
}
