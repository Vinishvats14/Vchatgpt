Deployment checklist for Vchatgpt

1) Build-time env for Vite frontend
- Vite requires env vars prefixed with VITE_ at build time. Set VITE_API_BASE_URL to your backend base URL (e.g., https://api.example.com) in your CI or hosting site settings before building.
- Example (Netlify): set ENV var VITE_API_BASE_URL=https://api.myapp.com, then run `npm run build`.

2) CORS
- Set `ALLOWED_ORIGINS` on the backend to a comma-separated list of allowed origins (e.g., https://www.example.com,https://app.example.com). If you want to allow any origin temporarily, set `ALLOWED_ORIGINS=*`.

3) HTTPS and Mixed Content
- Serve your frontend via HTTPS. Ensure the backend is also HTTPS or behind a secure proxy. Browsers block HTTP requests from HTTPS pages.

4) Secrets
- Never commit `.env` to the repo. Use `.env.example` with placeholders. Rotate any keys that were exposed.

5) Build & Deploy
- Frontend: set VITE_API_BASE_URL and build; deploy the `dist` to your hosting (Netlify, Vercel, GitHub Pages, etc.).
- Backend: set GROQ_API_KEY and TAVILY_API_KEY in the server host environment. Also set ALLOWED_ORIGINS.

6) Debugging
- Check browser devtools Network tab for failed requests. Note the request URL, status code, and response body.
- Check backend logs for incoming requests and error traces.

7) Example `.env.example`
GROQ_API_KEY=your_groq_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
ALLOWED_ORIGINS=https://your-site.com

If you tell me where you host the frontend (Netlify, Vercel, Render, GitHub Pages), I can give exact steps.
