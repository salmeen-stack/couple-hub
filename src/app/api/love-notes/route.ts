import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get received notes
    const notes = await prisma.loveNote.findMany({
      where: { receiverId: userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ notes })
  } catch (error) {
    console.error('Get love notes error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { senderId, receiverId, message, unlockCondition, unlockDate } = await request.json()

    const note = await prisma.loveNote.create({
      data: {
        senderId,
        receiverId,
        message,
        unlockCondition,
        unlockDate: unlockDate ? new Date(unlockDate) : null,
        isUnlocked: unlockCondition === 'immediate',
      },
    })

    // Update couple XP
    const couple = await prisma.couple.findFirst({
      where: {
        OR: [
          { partnerOneId: senderId },
          { partnerTwoId: senderId },
        ],
      },
    })

    if (couple) {
      await prisma.couple.update({
        where: { id: couple.id },
        data: { totalXP: { increment: 5 } },
      })
    }

    return NextResponse.json({ note, xpEarned: 5 })
  } catch (error) {
    console.error('Create love note error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { noteId } = await request.json()

    const note = await prisma.loveNote.update({
      where: { id: noteId },
      data: { isUnlocked: true },
    })

    return NextResponse.json({ note })
  } catch (error) {
    console.error('Unlock love note error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
