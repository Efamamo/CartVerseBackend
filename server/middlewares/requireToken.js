import jsonwebtoken from 'jsonwebtoken';
const jwt = jsonwebtoken;
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

// Middleware to validate the token
function requireToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(`token: ${token}`);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(401);

    req.user = user;
    next();
  });
}

export default requireToken;
