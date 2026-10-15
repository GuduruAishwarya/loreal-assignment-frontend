# L'Oréal Claims Assessment Frontend

Deployed URL:
https://frontend-2lgkx9lnr-guduruaishwaryas-projects.vercel.app

## Project overview

This frontend submits beauty claim data to the backend assessment API and displays the AI-generated decision, confidence, and reasoning.

## Local setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
2. Update the API URL for local development:
   ```env
   VITE_BACKEND_API_URL=http://localhost:3001
   ```
3. Start the app:
   ```bash
   npm install
   npm run dev
   ```

## Production environment configuration

The real production environment variables are configured in the Vercel dashboard, not in the repository.

Go to:

- Vercel Dashboard
- Project -> Settings
- Environment Variables

Set:

```env
VITE_BACKEND_API_URL=https://your-backend-url
```

Important: in Vite, frontend variables must be prefixed with `VITE_` to be exposed in the browser.

## Deployment notes

This project is deployed on Vercel and uses the live URL above for the frontend.
