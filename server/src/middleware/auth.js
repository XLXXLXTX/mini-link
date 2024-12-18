import jwt from 'jsonwebtoken';

import { isValidApiKey } from '../controllers/dbController.js';

/**
 * middleware function to authenticate requests using an API key.
 *
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next a callback function to continue to the next middleware or route handler
 * @returns {void} - This function checks if the request contains a valid API key in the headers.
 * - If no API key is provided, it returns a 401 Unauthorized response.
 * - If an invalid API key is provided, it returns a 403 Forbidden response.
 * - If the API key is valid, it calls the next() function to proceed to the next middleware or route handler.
 */
export const authenticateApiKey = async (req, res, next) => {
  const apiKey = req.headers['api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'ERROR: No API key provided' });
  }

  try {
    const valid = await isValidApiKey(apiKey);
    if (!valid) {
      return res.status(403).json({ error: 'ERROR: Invalid API key' });
    }

    // append the apiKey to the body of the request for further use
    req.body.apiKey = apiKey;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'ERROR: Internal server error' });
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    // get the authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'ERROR: No Authorization header provided' });
    }

    // extract the token from headers
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'ERROR: Token is missing' });
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // append userId to the request for later
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({ error: 'ERROR: Invalid or malformed token' });
  }
};
