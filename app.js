// * IMPORTS
require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const app = express();

// * MIDDLEWARE
app.use(cors()); // CORS
app.use(express.json()); // Body Parser

// * ROUTES
app.use('/api/v1/auth', require('./routes/auth.routes'));

// * START SERVER & DB
(async () => {
  try {
    // TODO: Start Database

    const PORT = process.env.PORT || 5000;
    const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';

    app.listen(PORT, () => console.log(`Server Listening: ${SERVER_URL}`)); // Start Server
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
