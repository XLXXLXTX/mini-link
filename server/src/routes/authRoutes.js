import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { verifyToken } from '../middleware/auth.js';
import { getUser, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // the username and password cant be empty, because in the fronent we are checking that
    // nevetherless, we are going to check it here too
    if (!username || !password) {
      return res.status(400).json({
        error: 'ERROR: body param `username` or `password` not received',
      });
    }

    // now we check if the user exists in the database, if not, we return an error
    const existingUser = await getUser(username);
    if (!existingUser) {
      return res.status(404).json({ error: 'ERROR: User not found' });
    }

    // in case the user exists, check if both passwords match
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return res.sataus(401).json({ message: 'Incorrect username or password: please try again.' });
    }

    // if the password match, generate a JWT token and send it back to the frontend
    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION || '1h' });
    return res.status(200).json({ message: 'Login success', token: token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'ERROR: Unable to login' });
  }
});

router.get('/admin', verifyToken, async (req, res) => {
  try {
    // check if the id in the request object (added by the verifyToken middleware)
    //  exists in the database
    const user = await getUserById(req.userId);
    if(!user) {
      return res.status(404).json({ error: 'ERROR: User not found' });
    }

    return res.status(200).json({ message: 'User authenticated', user });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'ERROR: Unable to verify token' });
  }
})

export default router;
