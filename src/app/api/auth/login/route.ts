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
    const partner = couple?.partnerOneId === user.id 
      ? couple?.partnerTwo 
      : couple?.partnerOne

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
        partnerOne: couple.partnerOne,
        partnerTwo: couple.partnerTwo,
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
