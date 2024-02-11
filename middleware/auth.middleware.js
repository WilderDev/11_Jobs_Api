// * IMPORTS
const jwt = require('jsonwebtoken');

// * MIDDLEWARE
// TODO: Middleware to Grab & Check JWT from Auth Headers
async function authMiddleware(req, res, next) {
  // Extract auth headers from request
  const authHeader = req.headers.authorization;

  // Check for existance and bearer prefix
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  // Seperate token from 'Bearer'
  const token = authHeader.split(' ')[1];

  try {
    // Verify the given token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the username to the request
    req.user = { userId: payload.userId, name: payload.name };

    next();
  } catch (error) {
    // Verification Failed
    return res.status(401).json({ msg: 'Not authorized' });
  }
}

// * EXPORTS
module.exports = authMiddleware;
