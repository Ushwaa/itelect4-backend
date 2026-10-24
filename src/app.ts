import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import submissionRoutes from './routes/submissionRoutes';
import courseRoutes from './routes/courseRoutes';
import { connectDB, isDbConnected } from './config/db';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const frontendOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    if (!origin || origin === frontendOrigin || origin === 'http://localhost:5173') {
      callback(null, true);
      return;
    }

    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

app.use(async (req, _res, next) => {
  if (req.path === '/health' || req.path === '/api/health') {
    next();
    return;
  }

  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', db: isDbConnected() });
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', db: isDbConnected() });
});

app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/submissions', submissionRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
