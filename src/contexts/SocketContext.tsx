'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  joinCouple: (coupleId: string) => void
  leaveCouple: (coupleId: string) => void
  emitCoupleUpdate: (coupleId: string, update: any) => void
  emitMemoryUpdate: (coupleId: string, memory: any) => void
  emitLoveNoteUpdate: (coupleId: string, note: any) => void
  emitGameActivity: (coupleId: string, activity: any) => void
  emitTyping: (coupleId: string, userId: string, isTyping: boolean) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketUrl = process.env.NODE_ENV === 'production' 
      ? window.location.origin 
      : 'http://localhost:3000'
    
    const socketInstance = io(socketUrl, {
      transports: ['websocket', 'polling']
    })

    socketInstance.on('connect', () => {
      console.log('Connected to Socket.io server')
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from Socket.io server')
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  const joinCouple = (coupleId: string) => {
    if (socket) {
      socket.emit('join-couple', coupleId)
    }
  }

  const leaveCouple = (coupleId: string) => {
    if (socket) {
      socket.emit('leave-couple', coupleId)
    }
  }

  const emitCoupleUpdate = (coupleId: string, update: any) => {
    if (socket) {
      socket.emit('couple-update', { coupleId, update })
    }
  }

  const emitMemoryUpdate = (coupleId: string, memory: any) => {
    if (socket) {
      socket.emit('memory-update', { coupleId, memory })
    }
  }

  const emitLoveNoteUpdate = (coupleId: string, note: any) => {
    if (socket) {
      socket.emit('love-note-update', { coupleId, note })
    }
  }

  const emitGameActivity = (coupleId: string, activity: any) => {
    if (socket) {
      socket.emit('game-activity', { coupleId, activity })
    }
  }

  const emitTyping = (coupleId: string, userId: string, isTyping: boolean) => {
    if (socket) {
      socket.emit('typing', { coupleId, userId, isTyping })
    }
  }

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        joinCouple,
        leaveCouple,
        emitCoupleUpdate,
        emitMemoryUpdate,
        emitLoveNoteUpdate,
        emitGameActivity,
        emitTyping
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export function useSocket() {
  const context = useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
