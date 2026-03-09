# TrainX7 — Fitness Platform

## Stack
- **Frontend**: React + TypeScript + Tailwind CSS + shadcn/ui
- **Auth & DB**: Supabase
- **Exercise Data**: ExerciseDB API (RapidAPI)
- **Nutrition Data**: Open Food Facts API (free, no key needed)
- **Charts**: Recharts
- **Payments**: Stripe (placeholder — wire up in Plans page)

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env

# 3. Fill in your keys in .env

# 4. Run dev server
npm run dev
```

## Get Your API Keys

### Supabase (Free)
1. Go to https://supabase.com → New project
2. Settings → API → copy URL and anon key

### ExerciseDB (Free tier — 500 req/day)
1. Go to https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb
2. Subscribe to free plan → copy API key

### Stripe (Payments)
1. Go to https://stripe.com → get test keys
2. Add to Plans.tsx checkout flow

## Pages
| Route | Page |
|-------|------|
| `/` | Home (Hero Slider + Features) |
| `/about` | Coach Mahmoud |
| `/plans` | Pricing |
| `/how-it-works` | Steps guide |
| `/transformations` | Before/After |
| `/blog` | Articles |
| `/faq` | FAQ Accordion |
| `/contact` | Contact Form + WhatsApp |
| `/signup` | Registration |
| `/login` | Login |
| `/onboarding` | 5-step setup |
| `/dashboard` | Full member area |

## Dashboard Tabs
- **Today's Workout** — auto-generated from user's goal + days, mark complete
- **Exercise Library** — ExerciseDB GIFs, search + filter by muscle group
- **Nutrition Tracker** — food search (Open Food Facts), macro calc per gram
- **Progress** — daily log, weekly bar chart, monthly line chart
- **My Plan** — full week-by-week workout schedule

## Deploying
```bash
npm run build
# Deploy /dist to Vercel, Netlify, or any static host
```
