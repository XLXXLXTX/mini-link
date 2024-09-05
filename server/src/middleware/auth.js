import { isValidApiKey } from '../controllers/dbController.js'

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

    next();
  } catch (error) {
    return res.status(500).json({ error: 'ERROR: Internal server error' });
  }
};
