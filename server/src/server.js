import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import apiRoutes from './routes/apiRoutes.js';
import authRoutes from './routes/authRoutes.js';

//--------------------------------------------------
// ENV VARS SECTION
//--------------------------------------------------

dotenv.config();

const PORT = process.env.BACKEND_PORT || 3001;

//--------------------------------------------------
// SERVER SECTION
//--------------------------------------------------

const app = express();

// express.json() and express.urlencoded() are built-in middleware functions
// to support JSON-encoded and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// to allow downloading resources for any origin
app.use(cors({
  origin: '*', //'http://localhost:5173', // allow only request from this origin
  methods: ['GET', 'POST'], // allow only these http verbs
  allowedHeaders: ['Content-Type', 'Authorization', 'api-key'], // allow only this headers
}));

//--------------------------------------------------
// ROUTES SECTION
//--------------------------------------------------

app.use('/', apiRoutes);
app.use('/auth', authRoutes);

//--------------------------------------------------
// INIT SERVER SECTION
//--------------------------------------------------

const initServer = async () => {
  try {
    console.log(
      `🔌 Database connected to ${
        process.env.TURSO_DATABASE_URL ?? process.env.LOCAL_DB_PATH
      }`
    );

    app.listen(PORT, () => {
      console.log(`✅ Server initiated on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

initServer();
