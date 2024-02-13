// * IMPORTS
require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const app = express();

const connectToMongo = require('./lib/mongoose');
const { PORT, SERVER_URL } = require('./lib/constants');

const authMiddleware = require('./middleware/auth.middleware');

// * MIDDLEWAREs
app.use(cors()); // CORS
app.use(express.json()); // Body Parser

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
