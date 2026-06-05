const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./Routers/AuthRouter');
const contactRouter = require('./Routers/ContactRouter');

const app = express();

mongoose.set('strictQuery', false);

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://college-cc.onrender.com',
    'https://campuscare.onrender.com',
    'https://campuscareeee.netlify.app',
    /\.onrender\.com$/,
    /\.netlify\.app$/,
    /\.vercel\.app$/,
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/contact', contactRouter);

app.get('/', (req, res) => res.json({ message: 'College Backend API is running 🎉' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

mongoose
  .connect(process.env.MONGO_url)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      // Keep Render free tier awake — ping every 14 minutes
      const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
      setInterval(() => {
        fetch(`${SELF_URL}/api/health`)
          .then(() => console.log('Keep-alive ping sent'))
          .catch((e) => console.error('Keep-alive ping failed:', e.message));
      }, 14 * 60 * 1000);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });