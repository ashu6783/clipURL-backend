import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import User from './models/User.js';
import authRoutes from './routes/auth.js';
import linksRoutes from './routes/links.js';
import redirectRoutes from './routes/redirect.js';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173','https://clip-url-frontend.vercel.app'], // ← your frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/links', linksRoutes);
app.use('/', redirectRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const existingUser = await User.findOne({ email: 'intern@dacoid.com' });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('Test123', 10);
      await User.create({ email: 'intern@dacoid.com', password: hashedPassword });//I did not kept it in env as there is no need for it is to be hardcoded and user has to be provided explicitely while submitting this.
      console.log('Hardcoded user created: intern@dacoid.com / Test123');
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));
