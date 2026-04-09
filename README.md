# trip-canvas

**TripCanvas** is an AI-native travel planning prototype that turns a user’s natural-language trip request into a structured, editable travel plan. Instead of behaving like a raw chatbot, it combines conversational input, itinerary generation, recommendation cards, and clear confidence/fallback states to help users move from vague travel intent to a usable trip plan. It is designed as the frontend foundation for a future booking companion rather than a one-off AI wrapper.

## Prerequisites

- [Node.js](https://nodejs.org/) (current LTS recommended)
- [pnpm](https://pnpm.io/installation)

## Setup

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Configure environment variables**

   Copy the example file and fill in any values your local run needs:

   ```bash
   cp .env.example .env.local
   ```

   The committed [`.env.example`](./.env.example) lists every variable the app expects. Do not commit `.env.local` or other files that contain secrets. For how Next.js loads env files, see the [Next.js environment variables documentation](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables).

3. **Start the dev server**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command       | Description                 |
| ------------- | --------------------------- |
| `pnpm dev`    | Run the app in development  |
| `pnpm build`  | Production build            |
| `pnpm start`  | Start the production server |
| `pnpm lint`   | Run ESLint                  |
| `pnpm format` | Format with Prettier        |

After `pnpm install`, a [Husky](https://typicode.github.io/husky/) `prepare` script installs Git hooks; commits run lint-staged (lint + format on staged files).
