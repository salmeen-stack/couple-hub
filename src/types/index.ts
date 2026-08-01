export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
}

export interface Couple {
  id: string
  partnerOneId: string
  partnerTwoId: string
  anniversaryDate?: Date
  level: number
  totalXP: number
  streak: number
  partnerOne?: User
  partnerTwo?: User
}

export interface Question {
  id: string
  category: string
  question: string
  type: 'guess' | 'daily' | 'truth' | 'dare' | 'would-you-rather' | 'memory'
}

export interface Answer {
  id: string
  questionId: string
  userId: string
  answer: string
  createdAt: Date
}

export interface Memory {
  id: string
  title: string
  description: string
  photo?: string
  location?: string
  date: Date
  createdAt: Date
}

export interface LoveNote {
  id: string
  senderId: string
  receiverId: string
  message: string
  unlockDate?: Date
  unlockCondition?: string
  isUnlocked: boolean
  createdAt: Date
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  requirement: number
}

export interface UserAchievement {
  id: string
  userId: string
  achievementId: string
  progress: number
  unlockedAt?: Date
}

export interface XPHistory {
  id: string
  userId: string
  activity: string
  xpEarned: number
  createdAt: Date
}

export interface GameResult {
  success: boolean
  xpEarned: number
  message: string
}

export type GameType = 'guess-my-answer' | 'daily-question' | 'truth-or-dare' | 'memory-challenge' | 'would-you-rather' | 'spin-the-wheel'
