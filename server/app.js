import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import listingRoutes from './routes/listingRoutes.js';
import messagingRoutes from './routes/messagingRoutes.js';
import marketPriceRoutes from './routes/marketPriceRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Setup env and connect DB
dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/messages', messagingRoutes);
app.use('/api/market-prices', marketPriceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// =============================
// Serve frontend in production
// =============================
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const frontendPath = path.join(__dirname, '../client/dist');

  app.use(express.static(frontendPath));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(frontendPath, 'index.html'))
  );
}

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
