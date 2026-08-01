'use client'

import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react'
import { useWebRTC } from '@/contexts/WebRTCContext'

export default function VoiceCall() {
  const { isCallActive, isMuted, startCall, endCall, toggleMute } = useWebRTC()

  if (!isCallActive) {
    return (
      <button
        onClick={startCall}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-love-500 to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50"
        title="Start voice call"
      >
        <Phone size={24} />
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 flex gap-3 z-50">
      <button
        onClick={toggleMute}
        className={`p-4 rounded-full shadow-lg transition-all hover:scale-110 ${
          isMuted 
            ? 'bg-gray-500 text-white' 
            : 'bg-gradient-to-r from-love-500 to-pink-600 text-white'
        }`}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
      </button>
      <button
        onClick={endCall}
        className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        title="End call"
      >
        <PhoneOff size={24} />
      </button>
    </div>
  )
}
