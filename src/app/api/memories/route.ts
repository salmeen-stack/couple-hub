import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const coupleId = searchParams.get('coupleId')

    if (!coupleId) {
      return NextResponse.json({ error: 'Couple ID required' }, { status: 400 })
    }

    const memories = await prisma.memory.findMany({
      where: { coupleId },
      orderBy: { date: 'desc' },
    })

    return NextResponse.json({ memories })
  } catch (error) {
    console.error('Get memories error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { coupleId, userId, title, description, location, date, photo } = await request.json()

    const memory = await prisma.memory.create({
      data: {
        coupleId,
        userId,
        title,
        description,
        location,
        date: new Date(date),
        photo,
      },
    })

    // Update couple XP
    await prisma.couple.update({
      where: { id: coupleId },
      data: { totalXP: { increment: 10 } },
    })

    return NextResponse.json({ memory, xpEarned: 10 })
  } catch (error) {
    console.error('Create memory error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
