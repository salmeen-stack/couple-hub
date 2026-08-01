import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting database seed...')

  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'partner1@couplehub.com' },
    update: {},
    create: {
      email: 'partner1@couplehub.com',
      name: 'Partner One',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=partner1',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'partner2@couplehub.com' },
    update: {},
    create: {
      email: 'partner2@couplehub.com',
      name: 'Partner Two',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=partner2',
    },
  })

  console.log('✅ Created users:', { user1, user2 })

  // Create couple
  const couple = await prisma.couple.upsert({
    where: { id: 'demo-couple-1' },
    update: {},
    create: {
      id: 'demo-couple-1',
      partnerOneId: user1.id,
      partnerTwoId: user2.id,
      anniversaryDate: new Date('2024-02-14'),
      level: 12,
      totalXP: 1250,
      streak: 18,
    },
  })

  console.log('✅ Created couple:', couple)

  // Create sample memories
  await prisma.memory.createMany({
    data: [
      {
        title: 'Beach Sunset',
        description: 'Our first Valentine\'s Day together. The sunset was absolutely beautiful.',
        location: 'Zanzibar',
        date: new Date('2024-02-14'),
        coupleId: couple.id,
        userId: user1.id,
      },
      {
        title: 'Mountain Hike',
        description: 'We climbed Mount Kilimanjaro together. It was challenging but amazing!',
        location: 'Kilimanjaro',
        date: new Date('2024-06-15'),
        coupleId: couple.id,
        userId: user2.id,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Created sample memories')

  // Create sample love notes
  await prisma.loveNote.createMany({
    data: [
      {
        senderId: user2.id,
        receiverId: user1.id,
        message: 'I love how you always know how to make me smile, even on my worst days. You are my sunshine.',
        unlockCondition: 'immediate',
        isUnlocked: true,
      },
      {
        senderId: user2.id,
        receiverId: user1.id,
        message: 'Open this when you\'re having a bad day. Remember that I believe in you and I\'m always here for you.',
        unlockCondition: 'Open When You\'re Sad',
        isUnlocked: false,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ Created sample love notes')

  console.log('🎉 Database seed completed successfully!')
  console.log('\n📝 Login credentials:')
  console.log('Partner 1: partner1@couplehub.com')
  console.log('Partner 2: partner2@couplehub.com')
  console.log('Password: (any password for demo)')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
