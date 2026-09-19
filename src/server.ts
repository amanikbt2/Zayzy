import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pocket_arcade';

// Security Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*' }));
app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Pocket Arcade Backend',
    timestamp: new Date().toISOString(),
    dbConnected: mongoose.connection.readyState === 1,
  });
});

// Serve Admin Dashboard Static Web Page
app.use('/admin', express.static(path.join(__dirname, 'admin-web')));

// Mount Main API Routes
app.use('/api', apiRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('[Pocket Arcade] API Server is running. Access Admin at /admin');
});

// Database Connection & Server Initialization
async function startServer() {
  try {
    console.log('Connecting to MongoDB database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Successfully connected to MongoDB.');

    app.listen(PORT, () => {
      console.log(`[SERVER] Pocket Arcade Server running on port ${PORT}`);
      console.log(`[ADMIN] Admin Dashboard: http://localhost:${PORT}/admin`);
      console.log(`[HEALTH] Health Check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start Pocket Arcade server:', error);
    process.exit(1);
  }
}

startServer();
