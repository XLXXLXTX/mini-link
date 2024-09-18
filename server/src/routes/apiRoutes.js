// Routes of the API

import express from 'express';
import { generateQR } from '../controllers/qrController.js';
import { formatDate } from '../utils/dateFormatter.js';
import {
  getLongURL,
  checkIfURLExists,
  createShortURL,
} from '../controllers/urlController.js';
import { buildShortUrl } from '../utils/shortener.js';
import { authenticateApiKey } from '../middleware/auth.js';

const router = express.Router();
const appStartTime = Date.now();

router.get('/api/runtime', (req, res) => {
  // return the start time of the application
  const formattedDate = formatDate(appStartTime);
  res.status(200).json({ startTime: formattedDate });
});

router.get('/:hashURL', async (req, res) => {
  try {
    // read the hashURL from the request
    const hashURL = req.params.hashURL;

    // check if the hashURL is already registered
    const result = await getLongURL(hashURL);
    const { longURL } = result;

    // if the hashURL is not registered, return an error
    if (!longURL) {
      return res.status(404).json({ error: 'ERROR: shortURL not created' });
    }

    // if the hashURL is registered, redirect to the longURL
    res.redirect(301, `${longURL}`);
  } catch (error) {
    res.status(500).json({ error: 'ERROR: Unable to retrieve the URL' });
  }
});

router.post('/create', authenticateApiKey, async (req, res) => {
  try {
    const { longURL, apiKey } = req.body;

    // check if the longURL parameter is received
    if (!longURL) {
      return res
        .status(400)
        .json({ error: 'ERROR: body param `longURL` not received' });
    }

    // check if the longURL is already shortened
    const { exist, hashURL } = await checkIfURLExists(longURL);

    // longURL is already shortened, return erro on creation it cause it exist, and the shortURL already created
    if (exist) {
      const shortURL = buildShortUrl(req, hashURL);

      if (req.body.generateQR) {
        const qrCodeImage = await generateQR(shortURL);

        return res.status(404).json({
          error: 'ERROR: url already shortened',
          shortURL: shortURL,
          qrCodeImage: qrCodeImage,
        });
      }

      return res.status(404).json({
        error: 'ERROR: url already shortened',
        shortURL: shortURL,
        qrCodeImage: null,
      });
    }

    // longURL is not shortened, create a new shortURL (register it in the database)
    // and return the shortURL created
    const shortURL = await createShortURL(req, longURL, apiKey);

    // in case the the request had a generatedQR: true, generate the QR code, and send it back
    if (req.body.generateQR) {
      const qrCodeImage = await generateQR(shortURL);
      return res.status(200).json({
        shortURL: shortURL,
        longURL: longURL,
        qrCodeImage: qrCodeImage,
      });
    }

    res
      .status(200)
      .json({ shortURL: shortURL, longURL: longURL, qrCodeImage: null });
  } catch (error) {
    res.status(500).json({ error: 'ERROR: Unable to create short URL' });
  }
});

export default router;
