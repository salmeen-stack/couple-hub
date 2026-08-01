# ❤️ Couple Hub – Personal Web-Based Couple Game

A private web application designed for two people in a relationship to play games, answer meaningful questions, complete fun challenges, celebrate milestones, preserve memories, and grow together.

## Features

### 🎮 Games
- **Guess My Answer** – Test how well you know your partner
- **Daily Question** – Meaningful daily conversations
- **Truth or Dare** – Fun challenges for couples
- **Would You Rather** – See if you think alike
- **Spin the Wheel** – Random activity selector
- **Memory Challenge** – Test your shared memories

### 📖 Memory Book
- Save and view shared memories with photos
- Add locations, dates, and descriptions
- Beautiful memory cards display

### 💌 Love Notes
- Send messages that unlock at special moments
- Conditions: immediate, tomorrow, when sad, birthday, anniversary, level milestones
- Surprise your partner throughout your relationship

### 🏆 Achievements & XP System
- Earn XP for completing activities
- Level up as a couple (New Couple → Legendary Couple)
- Track achievements and progress
- Love streak tracking

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js Route Handlers
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (ready to implement)
- **Storage**: Cloudinary (ready to implement)
- **Icons**: Lucide React

## Getting Started

### Quick Start - Play Online with Your Partner (Free)

**Option 1: Deploy to Vercel + Neon (Easiest - Free)**
1. Set up a free Neon database at [https://neon.tech](https://neon.tech)
2. Deploy to Vercel by connecting your GitHub repo
3. Add environment variables in Vercel:
   - `DATABASE_URL` (from Neon)
   - `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (your Vercel domain)
4. Run: `npx prisma db push` and `npm run db:seed` to set up the database
5. Share the Vercel URL with your partner!

**Option 2: Local Development**
- Node.js 18+ installed
- PostgreSQL database (or use Neon for free cloud database)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd couple-hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your database URL:
```
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

4. Set up the database:
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Demo Accounts (After Seeding Database)
- **Partner 1**: `partner1@couplehub.com`
- **Partner 2**: `partner2@couplehub.com`
- **Password**: (any password works for demo)

📖 **For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

## Project Structure

```
couple-hub/
├── src/
│   ├── app/
│   │   ├── dashboard/          # Main dashboard
│   │   ├── games/              # All game pages
│   │   │   ├── daily-question/
│   │   │   ├── guess-my-answer/
│   │   │   ├── truth-or-dare/
│   │   │   ├── would-you-rather/
│   │   │   ├── spin-the-wheel/
│   │   │   └── memory-challenge/
│   │   ├── login/              # Authentication page
│   │   ├── memories/           # Memory book feature
│   │   ├── love-notes/         # Love notes feature
│   │   ├── achievements/       # Achievements page
│   │   ├── layout.tsx          # Root layout with AuthProvider
│   │   └── page.tsx            # Home page (redirect)
│   ├── components/             # Reusable components
│   ├── contexts/               # React contexts (AuthContext)
│   ├── data/                   # Static data (questions, achievements)
│   ├── lib/                    # Utility functions
│   └── types/                  # TypeScript type definitions
├── prisma/
│   └── schema.prisma           # Database schema
└── tailwind.config.ts          # Tailwind configuration
```

## Development Roadmap

### Phase 1 ✅ (Completed)
- User authentication (mock)
- Dashboard
- Daily Question game
- All 6 games implemented
- Memory Book feature
- Love Notes feature
- Achievements system

### Phase 2 (Future)
- Real authentication with NextAuth.js
- Database integration with Prisma
- Real-time multiplayer features
- Image upload with Cloudinary
- Mobile app version

### Phase 3 (Future)
- Push notifications
- Advanced analytics
- More game modes
- Themes and customization
- Social features (optional)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and for personal use only.

## Made with ❤️

Built with love for couples everywhere.
