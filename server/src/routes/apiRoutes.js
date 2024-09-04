// Routes of the API

import express from 'express';
import { formatDate } from '../utils/dateFormatter.js';
import { getLongURL, checkIfURLExists, createShortURL } from '../controllers/urlController.js';
import { buildShortUrl } from '../utils/shortener.js';

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

    // if the hashURL is not registered, return an error
    if (!result) {
      return res.status(404).json({ error: 'ERROR: shortURL not created' });
    }

    // if the hashURL is registered, redirect to the longURL
    const { longURL } = result;
    res.redirect(301, `${longURL}`);

  } catch (error) {
    res.status(500).json({ error: 'ERROR: Unable to retrieve the URL' });
  }
});

router.post('/create', async (req, res) => {
  try {
    const longURL = req.body.longURL ?? '';

    // check if the longURL parameter is received
    if (!longURL) {
      return res.status(400).json({ error: 'ERROR: body param `longURL` not received' });
    }

    // check if the longURL is already shortened
    const rs = await checkIfURLExists(longURL);

    let { exist, hashURL } = rs;

    // longURL is already shortened, return erro on creation it cause it exist, and the shortURL already created
    if (exist) {
      const shortURL = buildShortUrl(req, hashURL);
      return res.status(404).json({ error: 'ERROR: url already shortened', shortURL: shortURL });
    }

    // longURL is not shortened, create a new shortURL (register it in the database)
    // and return the shortURL created
    const shortURL = await createShortURL(req, longURL);
    res.status(200).json({ shortURL: shortURL, longURL: longURL });

  } catch (error) {
    res.status(500).json({ error: 'ERROR: Unable to create short URL' });
  }

});

export default router;