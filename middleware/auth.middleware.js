// * IMPORTS
const jwt = require('jsonwebtoken');
const { unsuccessfulRes } = require('../lib/response');

// * MIDDLEWARE
// Middleware to Grab & Check JWT from Auth Headers
async function authMiddleware(req, res, next) {
  // Extract auth headers from request
  const authHeader = req.headers.authorization;

  // Check for existance and bearer prefix
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return unsuccessfulRes({ res, status: 401, message: 'Unauthorized' });
  }

  // Seperate token from 'Bearer '
  const bearerToken = authHeader.split(' ')[1]; // ["Bearer", "dkfsjkldsjf"]

  try {
    // Verify the given token
    const verifiedJWT = jwt.verify(bearerToken, process.env.JWT_SECRET);

    // Attach the username to the request
    req.user = { name: verifiedJWT.name };

    // Next Middleware
    next();
  } catch (error) {
    // Verification Failed
    return unsuccessfulRes({ res });
  }
}

// * EXPORTS
module.exports = authMiddleware;
