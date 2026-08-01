import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { userId, coupleId, question, answer } = await request.json()

    // Save the answer
    const savedAnswer = await prisma.answer.create({
      data: {
        userId,
        questionId: question.id,
        answer,
      },
    })

    // Check if partner has also answered
    const couple = await prisma.couple.findUnique({
      where: { id: coupleId },
      include: {
        partnerOne: true,
        partnerTwo: true,
      },
    })

    const partnerId = couple?.partnerOneId === userId 
      ? couple?.partnerTwoId 
      : couple?.partnerOneId

    const partnerAnswer = await prisma.answer.findFirst({
      where: {
        userId: partnerId,
        questionId: question.id,
      },
    })

    // Update couple XP
    if (partnerAnswer) {
      await prisma.couple.update({
        where: { id: coupleId },
        data: {
          totalXP: { increment: 15 },
        },
      })
    }

    return NextResponse.json({
      success: true,
      partnerAnswer: partnerAnswer?.answer || null,
      bothAnswered: !!partnerAnswer,
      xpEarned: partnerAnswer ? 15 : 0,
    })
  } catch (error) {
    console.error('Daily question error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
