// * IMPORTS
require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectToMongo = require('./lib/mongoose');
const { PORT, SERVER_URL } = require('./lib/constants');

const authMiddleware = require('./middleware/auth.middleware');

// SECURITY
const helment = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// * MIDDLEWAREs
app.use(xss()); // XSS
app.use(cors()); // CORS
app.use(helment()); // Header Security
app.use(express.json()); // Body Parser
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 Minutes
    max: 100, // limit each IP to 100 requests per window (15 mins)
  }),
); // Rate Limited (Prevents Brute Force Attacks)

// * ROUTES
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/jobs', authMiddleware, require('./routes/job.routes'));

// * START SERVER & DB
(async () => {
  try {
    await connectToMongo(process.env.MONGO_URI); // Start Database

    app.listen(PORT, () => console.log(`Server Listening: ${SERVER_URL}`)); // Start Server
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
