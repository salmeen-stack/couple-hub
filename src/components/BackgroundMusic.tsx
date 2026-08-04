'use client'

import { useEffect, useRef, useState } from 'react'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.2 // Low volume
      audio.addEventListener('canplaythrough', () => {
        setIsLoaded(true)
        audio.play().catch(console.error) // Auto-play when ready
      })
    }
  }, [])

  return (
    <audio
      ref={audioRef}
      src="/music/Elissa & Saad Lamjarred - Min Awel Dekika [Official Video] (2022) _ اليسا وسعد لمجرد - من أول دقيقة - Elissa.mp3"
      loop
      autoPlay
    />
  )
}
