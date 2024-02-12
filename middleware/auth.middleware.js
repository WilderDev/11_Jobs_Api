// * IMPORTS

// * MIDDLEWARE
// TODO: Middleware to Grab & Check JWT from Auth Headers
async function authMiddleware(req, res, next) {
  // Extract auth headers from request

  // Check for existance and bearer prefix

  // Seperate token from 'Bearer'

  try {
    // Verify the given token
    // Attach the username to the request
    // Next Middleware
  } catch (error) {
    // Verification Failed
  }
}

// * EXPORTS
module.exports = authMiddleware;
