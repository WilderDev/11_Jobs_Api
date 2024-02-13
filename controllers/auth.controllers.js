// * IMPORTS
const User = require('../models/User.model');
const { successfulRes, unsuccessfulRes } = require('../lib/response');

// * CONTROLLERS
// Register a User - POST: /api/v1/auth/register
async function registerUser(req, res) {
  // 1. Try to save the user to the DB
  const newUser = await User.create(req.body);

  // 2. Create the JWT Token and Send it back
  const token = newUser.genJWT();

  successfulRes({
    res,
    status: 201,
    data: {
      user: {
        name: newUser.name,
        email: newUser.email,
        id: newUser.id,
      },
      token,
    },
  });
}

// Login a User - POST: /api/v1/auth/login
async function loginUser(req, res) {
  // 1. Get email and password from request body
  const { email, password } = req.body;

  // 2. Check that email and password both exist
  if (!email || !password)
    return unsuccessfulRes({
      res,
      message: 'Please provide valid credentials',
    });

  // 3. Check if the user with that email lives in the database
  const foundUser = await User.findOne({ email });

  if (!foundUser)
    return unsuccessfulRes({
      res,
      status: 401,
      message: 'Unauthorized',
    });

  // 4. Check if the password for that user is the same as the password they passed in
  const passwordMatch = await foundUser.comparePasswords(password);

  if (!passwordMatch)
    return unsuccessfulRes({
      res,
      status: 401,
      message: 'Unauthorized',
    });

  // 5. Create a JWT Token
  const token = foundUser.genJWT();

  // 6. Send Successful response with user and token
  successfulRes({
    res,
    data: {
      user: {
        name: foundUser.name,
        email: foundUser.email,
        id: foundUser.id,
      },
      token,
    },
  });
}

// * EXPORTS
module.exports = {
  registerUser,
  loginUser,
};
