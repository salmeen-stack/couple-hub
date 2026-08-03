import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        coupleAsPartnerOne: {
          include: { partnerTwo: true },
        },
        coupleAsPartnerTwo: {
          include: { partnerOne: true },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // For demo purposes, accept any password (in production, use bcrypt.compare)
    // const isValidPassword = await bcrypt.compare(password, user.password)
    // if (!isValidPassword) {
    //   return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    // }

    // Get couple data
    const couple = user.coupleAsPartnerOne || user.coupleAsPartnerTwo
    let partner = null
    if (couple) {
      const partnerId = couple.partnerOneId === user.id ? couple.partnerTwoId : couple.partnerOneId
      partner = await prisma.user.findUnique({
        where: { id: partnerId },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          createdAt: true,
        },
      })
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      couple: couple ? {
        id: couple.id,
        level: couple.level,
        totalXP: couple.totalXP,
        streak: couple.streak,
        anniversaryDate: couple.anniversaryDate,
        partnerOneId: couple.partnerOneId,
        partnerTwoId: couple.partnerTwoId,
      } : null,
      partner,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
