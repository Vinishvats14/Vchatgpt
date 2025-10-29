import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generate } from './chatbot.js';


dotenv.config();

const app = express() ;
const port = process.env.PORT || 3001 ;
// Configure CORS from ALLOWED_ORIGINS environment variable (comma-separated)
const allowed = (process.env.ALLOWED_ORIGINS || `${process.env.CLIENT_URL || ''},http://localhost:5173`)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

app.use(
    cors({
        origin: function (origin, callback) {
            // allow non-browser tools like curl (no origin)
            if (!origin) return callback(null, true);
            if (allowed.indexOf(origin) !== -1 || allowed.indexOf('*') !== -1) {
                return callback(null, true);
            }
            console.warn('Blocked CORS origin:', origin);
            return callback(new Error('CORS not allowed for origin'), false);
        },
        credentials: true,
    })
);

app.use(express.json()) ;

app.get('/', (req, res) => {
    res.send('Welcome to ChatDPT!');
});

app.post('/chat' , async(req ,res) => {
    const {message , threadId} = req.body ;

    if(!message || !threadId) {
        return res.status(400).json({error : " MISSING FIELDS "}) ;
    }
    console.log('Message', message);

    const result = await generate(message, threadId);
    res.json({ message: result });
}) ;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

{/*🔑 Pure Flow Summary
1.Frontend:
JS Object → JSON.stringify → JSON string → HTTP body
body: JSON.stringify({ threadId, message: inputText }), converts into {"threadId":"abc123","message":"hello"}


2.Server (Express):
HTTP body (JSON string) → express.json() → JSON.parse() → JS Object
EX . app.use(express.json());  converts into req.body = { threadId: "abc123", message: "hello" };


3.Server Process:
Object → kuch calculation (generate) → result
EX . const result = await generate(message, threadId); converts into Server apna logic run karta hai (yahan generate() function).
Output maan le "Hi, how can I help?".


4 .Server Response:
JS Object → res.json() → JSON.stringify → JSON string → HTTP Response

EX .  res.json({ message: result }); converts into {"message":"Hi, how can I help?"}


5.Frontend:
JSON string → response.json() → JSON.parse() → JS Object
// EX.const result = await response.json(); converts into { message: "Hi, how can I help?" }
// return result.message */ }
