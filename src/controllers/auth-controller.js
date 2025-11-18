import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {selectUserByUsername} from '../models/user-model.js';

// user authentication (login)
const login = async (req, res) => {
  const {username, password} = req.body;

  if (!username) {
    return res.status(401).json({message: 'Username missing.'});
  }

  const user = await selectUserByUsername(username);

  if (user) {
    // simple plaintext comparison (NOT secure)
    const match = password === user.password;

    if (match) {
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      return res.json({message: 'login ok', user, token});
    }
  }

  res.status(401).json({message: 'Bad username/password.'});
};

const getMe = async (req, res) => {
  console.log('getMe', req.user);
  if (req.user) {
    res.json({message: 'token ok', user: req.user});
  } else {
    res.sendStatus(401);
  }
};

export {login, getMe};
