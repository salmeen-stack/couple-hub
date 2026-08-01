import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export function useRealtimeSync<T>(
  fetchFn: () => Promise<T>,
  interval: number = 5000,
  enabled: boolean = true
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!enabled) return

    let mounted = true

    const fetchData = async () => {
      try {
        const result = await fetchFn()
        if (mounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    const intervalId = setInterval(fetchData, interval)

    return () => {
      mounted = false
      clearInterval(intervalId)
    }
  }, [fetchFn, interval, enabled])

  return { data, loading, error, refetch: () => fetchFn().then(setData) }
}

export function useCoupleSync() {
  const { user } = useAuth()
  
  return useRealtimeSync(
    async () => {
      if (!user) return null
      const response = await fetch(`/api/couple?userId=${user.id}`)
      const data = await response.json()
      return data.couple
    },
    5000,
    !!user
  )
}

export function useMemoriesSync(coupleId: string | undefined) {
  return useRealtimeSync(
    async () => {
      if (!coupleId) return []
      const response = await fetch(`/api/memories?coupleId=${coupleId}`)
      const data = await response.json()
      return data.memories
    },
    10000,
    !!coupleId
  )
}

export function useLoveNotesSync(userId: string | undefined) {
  return useRealtimeSync(
    async () => {
      if (!userId) return []
      const response = await fetch(`/api/love-notes?userId=${userId}`)
      const data = await response.json()
      return data.notes
    },
    10000,
    !!userId
  )
}
