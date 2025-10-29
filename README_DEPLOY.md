# Deployment Guide for VChatGPT

This guide explains how to deploy the VChatGPT application to production.

## Architecture

The application consists of two parts:
- **Backend**: Node.js/Express server (server.js)
- **Frontend**: React/Vite application (frontend/)

## Backend Deployment (Render.com)

1. Deploy the backend to Render.com as a Web Service
2. Set the following environment variables in Render:
   - `GROQ_API_KEY`: Your Groq API key
   - `TAVILY_API_KEY`: Your Tavily API key
   - `CLIENT_URL`: Your frontend URL (e.g., `https://your-frontend.vercel.app`)
   - `PORT`: (Optional) Render will set this automatically

3. Build Command: `npm install`
4. Start Command: `npm start`
5. Root Directory: `/`

## Frontend Deployment (Vercel/Netlify)

1. Deploy the frontend to your hosting platform
2. **IMPORTANT**: Set the following environment variable:
   - `VITE_API_BASE_URL`: Your backend URL (e.g., `https://vchatgpt.onrender.com`)

3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Root Directory: `frontend`

### Example: Vercel Deployment

```bash
cd frontend
vercel --prod
```

Then add the environment variable in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add `VITE_API_BASE_URL` with your backend URL

### Example: Netlify Deployment

In `netlify.toml` or Netlify dashboard, set:
```
[build.environment]
  VITE_API_BASE_URL = "https://your-backend-url.onrender.com"
```

## Local Development

1. Backend:
```bash
cp .env.example .env
# Edit .env with your API keys
npm install
npm start
```

2. Frontend:
```bash
cd frontend
# No .env needed for local dev - it uses localhost:3001 by default
npm install
npm run dev
```

## Troubleshooting 404 Errors

If you're getting 404 errors when the frontend tries to call the backend:

1. **Check VITE_API_BASE_URL**: Ensure this environment variable is set correctly in your frontend deployment platform
2. **Check CORS**: Ensure your backend's `CLIENT_URL` environment variable matches your frontend URL
3. **Check Backend URL**: Verify the backend is deployed and accessible at the URL specified in `VITE_API_BASE_URL`
4. **Check Route**: The frontend calls `/chat` endpoint - ensure it exists in `server.js`

### How the Frontend Determines the API URL

The frontend (`frontend/src/chat.jsx`) uses this logic:

```javascript
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001"
    : import.meta.env.VITE_API_BASE_URL;
```

- **Development mode** (`npm run dev`): Uses `http://localhost:3001`
- **Production mode** (`npm run build`): Uses the `VITE_API_BASE_URL` environment variable

**Important**: Environment variables in Vite must be prefixed with `VITE_` to be exposed to the frontend code.
