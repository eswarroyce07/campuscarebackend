const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./Routers/AuthRouter');
const contactRouter = require('./Routers/ContactRouter');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://campuscare.onrender.com',
    /\.onrender\.com$/,
    /\.netlify\.app$/,
    /\.vercel\.app$/,
  ],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/contact', contactRouter);

app.get('/', (req, res) => res.json({ message: 'College Backend API is running 🎉' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

mongoose
  .connect(process.env.MONGO_url)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));