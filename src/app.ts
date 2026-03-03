import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// Security headers
app.use(helmet());
app.set('trust proxy', 1);

// Allowed CORS origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
];

// EXPRESS CORS — THE ONLY CORS HANDLER
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('CORS: Origin not allowed'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting (skip OPTIONS)
// const loginLimiter = rateLimit({
//   windowMs: 3 * 60 * 60 * 1000,
//   max: 2,
//   skip: (req) => req.method === 'OPTIONS',
//   message: 'Too many login attempts. Please wait 3 hours before retrying.',
// });

// app.use('/api/v1/auth/login/request-otp', loginLimiter);

// Health check
app.get('/health', (req: Request, res: Response) =>
  res.json({ status: 'success', message: 'API is healthy' })
);

app.get('/', (req: Request, res: Response) =>
  res.json({
    status: 'success',
    message: 'Welcome to QuickHire API',
    data: { version: '1.0.0' },
  })
);

// Routes
app.use('/api/v1', router);

// Error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;
