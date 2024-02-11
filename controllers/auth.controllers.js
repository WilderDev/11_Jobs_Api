// * IMPORTS
const User = require('../models/User.model');
const { successfulRes, unsuccessfulRes } = require('../lib/response');

// * CONTROLLERS
// TODO: Register a User - POST: /api/v1/auth/register
async function registerUser(req, res) {
  const newUser = await User.create(req.body);

  const token = newUser.genJWT();

  successfulRes({
    res,
    status: 201,
    data: {
      user: {
        id: newUser.id,
        name: newUser.name,
      },
      token,
    },
  });
}

// TODO: Login a User - POST: /api/v1/auth/login
async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return unsuccessfulRes({ res, status: 400, message: 'Invalid Request' });

  const foundUser = await User.findOne({ email });

  if (!foundUser)
    return unsuccessfulRes({ res, status: 401, message: 'Unauthorized' });

  const passwordMatch = await foundUser.comparePasswords(password);

  if (!passwordMatch)
    return unsuccessfulRes({ res, status: 401, message: 'Unauthorized' });

  const token = foundUser.genJWT();

  successfulRes({
    res,
    data: {
      user: {
        id: foundUser._id,
        name: foundUser.name,
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
