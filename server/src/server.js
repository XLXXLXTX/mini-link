import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import apiRoutes from './routes/apiRoutes.js';

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
  allowedHeaders: ['Content-Type', 'api-key'], // allow only this headers
}));

//--------------------------------------------------
// ROUTES SECTION
//--------------------------------------------------

app.use('/', apiRoutes);


//--------------------------------------------------
// INIT SERVER SECTION
//--------------------------------------------------

const initServer = async () => {
  try {

    app.listen(PORT, () => {
      console.log(`✅ Server initiated on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

initServer();
