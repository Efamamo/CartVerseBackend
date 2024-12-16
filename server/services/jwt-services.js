import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
dotenv.config();
const jwt = jsonwebtoken;

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

export function generateToken(user) {
  const payload = {
    id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '15d' });
  return token;
}

export function generateRefreshToken(user) {
  const payload = {
    id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
  return token;
}
