'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import SimplePeer from 'simple-peer'
import { useSocket } from './SocketContext'
import { useAuth } from './AuthContext'

interface WebRTCContextType {
  isCallActive: boolean
  isMuted: boolean
  startCall: () => void
  endCall: () => void
  toggleMute: () => void
}

const WebRTCContext = createContext<WebRTCContextType | undefined>(undefined)

export function WebRTCProvider({ children }: { children: ReactNode }) {
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null)
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  
  const { socket } = useSocket()
  const { user, couple } = useAuth()

  useEffect(() => {
    if (!socket) return

    // Handle incoming call offer
    socket.on('call-offer', async ({ offer, callerId }) => {
      if (!localStream) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        setLocalStream(stream)
      }

      const newPeer = new SimplePeer({ initiator: false, trickle: false, stream: localStream })
      
      newPeer.on('signal', (answer) => {
        socket.emit('call-answer', { answer, callerId })
      })

      newPeer.on('stream', (stream) => {
        setRemoteStream(stream)
        setIsCallActive(true)
      })

      newPeer.signal(offer)
      setPeer(newPeer)
    })

    // Handle incoming call answer
    socket.on('call-answer', ({ answer }) => {
      if (peer) {
        peer.signal(answer)
      }
    })

    // Handle call ended
    socket.on('call-ended', () => {
      endCall()
    })

    return () => {
      socket.off('call-offer')
      socket.off('call-answer')
      socket.off('call-ended')
    }
  }, [socket, peer, localStream])

  const startCall = async () => {
    if (!socket || !couple) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setLocalStream(stream)

      const newPeer = new SimplePeer({ initiator: true, trickle: false, stream })
      
      newPeer.on('signal', (offer) => {
        socket.emit('call-offer', { offer, coupleId: couple.id })
      })

      newPeer.on('stream', (stream) => {
        setRemoteStream(stream)
        setIsCallActive(true)
      })

      setPeer(newPeer)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const endCall = () => {
    if (peer) {
      peer.destroy()
      setPeer(null)
    }
    
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop())
      setLocalStream(null)
    }
    
    setRemoteStream(null)
    setIsCallActive(false)
    
    if (socket && couple) {
      socket.emit('call-ended', { coupleId: couple.id })
    }
  }

  const toggleMute = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setIsMuted(!audioTrack.enabled)
      }
    }
  }

  return (
    <WebRTCContext.Provider value={{ isCallActive, isMuted, startCall, endCall, toggleMute }}>
      {children}
    </WebRTCContext.Provider>
  )
}

export function useWebRTC() {
  const context = useContext(WebRTCContext)
  if (context === undefined) {
    throw new Error('useWebRTC must be used within a WebRTCProvider')
  }
  return context
}
