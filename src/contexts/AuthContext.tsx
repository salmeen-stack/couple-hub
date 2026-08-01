'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, Couple } from '@/types'
import { useSocket } from './SocketContext'

interface AuthContextType {
  user: User | null
  couple: Couple | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [couple, setCouple] = useState<Couple | null>(null)
  const [loading, setLoading] = useState(true)
  const { joinCouple, leaveCouple, socket } = useSocket()

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('user')
    const storedCouple = localStorage.getItem('couple')
    
    if (storedUser && storedCouple) {
      const parsedUser = JSON.parse(storedUser)
      const parsedCouple = JSON.parse(storedCouple)
      setUser(parsedUser)
      setCouple(parsedCouple)
      
      // Join couple room for real-time updates
      if (socket && socket.connected) {
        joinCouple(parsedCouple.id)
      }
    }
    setLoading(false)
  }, [socket, joinCouple])

  const login = async (email: string, password: string) => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }
      
      setUser(data.user)
      setCouple(data.couple)
      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('couple', JSON.stringify(data.couple))
      
      // Join couple room for real-time updates
      if (socket && socket.connected) {
        joinCouple(data.couple.id)
      }
    } catch (error: any) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    // Leave couple room before logout
    if (couple && socket && socket.connected) {
      leaveCouple(couple.id)
    }
    
    setUser(null)
    setCouple(null)
    localStorage.removeItem('user')
    localStorage.removeItem('couple')
  }

  return (
    <AuthContext.Provider value={{ user, couple, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
