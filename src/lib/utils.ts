import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateLevel(xp: number): number {
  // Level formula: Level = floor(sqrt(XP / 100)) + 1
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

export function xpForNextLevel(currentLevel: number): number {
  // XP needed for next level
  return Math.pow(currentLevel, 2) * 100
}

export function getLevelTitle(level: number): string {
  if (level < 5) return "New Couple"
  if (level < 10) return "Best Friends"
  if (level < 20) return "Soulmates"
  if (level < 50) return "Adventure Partners"
  return "Legendary Couple ❤️"
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

export function formatXP(xp: number): string {
  return xp.toLocaleString()
}
