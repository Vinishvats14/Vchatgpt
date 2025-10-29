# VChatGPT 💬

A modern chat application powered by AI, built with React and Node.js.

## Features

- Real-time chat interface with AI assistance
- Modern, responsive UI with Tailwind CSS
- Web search capabilities using Tavily
- AI-powered responses using Groq

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express
- Groq SDK
- Tavily API

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Groq API Key
- Tavily API Key

### Setup

1. Clone the repository
```bash
git clone <repository-url>
cd Vchatgpt
```

2. Set up the backend
```bash
# Install backend dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env and add your API keys
```

3. Set up the frontend
```bash
cd frontend
npm install
```

4. Run the application

In one terminal, start the backend:
```bash
npm start
```

In another terminal, start the frontend:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Deployment

See [README_DEPLOY.md](./README_DEPLOY.md) for detailed deployment instructions.

**Quick Summary:**
- Backend: Deploy to Render.com with environment variables for API keys
- Frontend: Deploy to Vercel/Netlify with `VITE_API_BASE_URL` environment variable pointing to your backend

## Environment Variables

### Backend (.env)
```
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
CLIENT_URL=your_frontend_url
PORT=3001
```

### Frontend (Set in deployment platform)
```
VITE_API_BASE_URL=your_backend_url
```

## Project Structure

```
.
├── server.js           # Express server
├── chatbot.js          # AI chat logic
├── index.js            # CLI interface
├── frontend/           # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── chat.jsx    # Main chat component
│   │   └── main.jsx
│   └── package.json
└── package.json        # Backend dependencies
```

## Contributing

Feel free to open issues and pull requests!

## License

MIT
