import { isValidApiKey } from '../controllers/dbController.js'

export const authenticateApiKey = async (req, res, next) => {
  const apiKey = req.headers['api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'No API key provided' });
  }

  try {
    const valid = await isValidApiKey(apiKey);
    if (!valid) {
      return res.status(403).json({ error: 'Invalid API key' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
