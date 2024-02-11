// * IMPORTS
const router = require('express').Router();

const { registerUser, loginUser } = require('../controllers/auth.controllers');

// * ROUTES
// REGISTER
router.post('/register', registerUser);

// LOGIN
router.post('/login', loginUser);

// * EXPORTS
module.exports = router;
