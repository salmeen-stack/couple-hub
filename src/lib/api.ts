// API helper functions for frontend to call backend

export async function login(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return response.json()
}

export async function getCouple(userId: string) {
  const response = await fetch(`/api/couple?userId=${userId}`)
  return response.json()
}

export async function updateCouple(coupleId: string, data: any) {
  const response = await fetch('/api/couple', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ coupleId, ...data }),
  })
  return response.json()
}

export async function submitDailyQuestion(data: any) {
  const response = await fetch('/api/games/daily-question', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function getMemories(coupleId: string) {
  const response = await fetch(`/api/memories?coupleId=${coupleId}`)
  return response.json()
}

export async function createMemory(data: any) {
  const response = await fetch('/api/memories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function getLoveNotes(userId: string) {
  const response = await fetch(`/api/love-notes?userId=${userId}`)
  return response.json()
}

export async function createLoveNote(data: any) {
  const response = await fetch('/api/love-notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function unlockLoveNote(noteId: string) {
  const response = await fetch('/api/love-notes', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ noteId }),
  })
  return response.json()
}
