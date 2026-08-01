import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    // Get couple data for user
    const couple = await prisma.couple.findFirst({
      where: {
        OR: [
          { partnerOneId: userId },
          { partnerTwoId: userId },
        ],
      },
      include: {
        partnerOne: true,
        partnerTwo: true,
        memories: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })

    if (!couple) {
      return NextResponse.json({ couple: null })
    }

    return NextResponse.json({ couple })
  } catch (error) {
    console.error('Get couple error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { coupleId, totalXP, streak, level } = await request.json()

    const updatedCouple = await prisma.couple.update({
      where: { id: coupleId },
      data: {
        totalXP: totalXP || undefined,
        streak: streak || undefined,
        level: level || undefined,
      },
    })

    return NextResponse.json({ couple: updatedCouple })
  } catch (error) {
    console.error('Update couple error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
