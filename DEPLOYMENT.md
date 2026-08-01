# 🚀 Deployment Guide - Play Online with Your Partner

This guide will help you deploy Couple Hub online so you and your partner can play together from anywhere.

## Quick Start (Free Deployment)

### Option 1: Neon + Vercel (Recommended - Free)

**Step 1: Set up Neon Database (Free)**
1. Go to [https://neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project
4. Copy the connection string (DATABASE_URL)

**Step 2: Deploy to Vercel (Free)**
1. Go to [https://vercel.com](https://vercel.com)
2. Sign up and import your GitHub repository
3. Add environment variables:
   - `DATABASE_URL` (from Neon)
   - `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (your Vercel domain)
4. Click Deploy

**Step 3: Seed the Database**
After deployment, run the seed script:
```bash
# In your local terminal
npx prisma db push --schema=./prisma/schema.prisma
npx tsx prisma/seed.ts
```

**Step 4: Share with Your Partner**
- Share the Vercel URL with your partner
- Both of you can log in with:
  - Partner 1: `partner1@couplehub.com`
  - Partner 2: `partner2@couplehub.com`
  - Password: (any password for demo)

### Option 2: Local Development with Remote Database

If you want to run locally but use a remote database:

```bash
# 1. Set up Neon database (as above)
# 2. Copy DATABASE_URL to your local .env file
# 3. Run database setup
npm run db:generate
npm run db:push
npm run db:seed

# 4. Start the app
npm run dev
```

Now your local app will sync with the remote database, and your partner can access it via your network or ngrok.

## Environment Variables

Create a `.env` file in the root directory:

```env
# Database (Required - get from Neon)
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# NextAuth (Required for production)
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Cloudinary (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

## Database Setup Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with demo data
npm run db:seed
```

## How It Works Online

### Real-Time Sync
- Both partners log in to the same app
- All data is stored in the cloud (Neon database)
- When one partner answers a question, the other sees it
- Memories and love notes are shared instantly

### Multiplayer Features
- **Daily Question**: Both see the same question, answers sync when both submit
- **Guess My Answer**: Partner A answers secretly, Partner B guesses
- **Would You Rather**: Both choose privately, results revealed together
- **Memory Book**: Both can add and view shared memories
- **Love Notes**: Send notes that unlock at specific times

## Troubleshooting

### Database Connection Issues
```bash
# Test your database connection
npx prisma db push
```

### Build Errors
```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Loading
- Make sure `.env` is in the root directory
- Restart the dev server after adding variables
- On Vercel, check Settings > Environment Variables

## Security Notes

For production use:
1. Use strong passwords for database
2. Generate a secure NEXTAUTH_SECRET
3. Enable SSL (Neon does this by default)
4. Consider adding rate limiting
5. Implement proper password hashing (bcrypt)

## Alternative: Supabase (Also Free)

If you prefer Supabase instead of Neon:

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > Database
4. Copy the connection string
5. Use it as your DATABASE_URL

The rest of the setup is the same!

## Need Help?

If you encounter issues:
1. Check the logs in Vercel dashboard
2. Verify DATABASE_URL is correct
3. Make sure Prisma schema matches database
4. Check that all environment variables are set

## Demo Accounts

After seeding, you'll have these accounts ready:
- **Partner 1**: partner1@couplehub.com
- **Partner 2**: partner2@couplehub.com
- **Password**: (any password works for demo)

You can create more accounts by modifying `prisma/seed.ts` and running `npm run db:seed` again.
