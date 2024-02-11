// * IMPORTS
const mongoose = require('mongoose');

// * METHODS
function connectToMongo(dbConnectionString) {
  const dbConnection = mongoose.connect(dbConnectionString);

  if (dbConnection) {
    const MONGO_DB_NAME = dbConnectionString
      .split('mongodb.net/')[1]
      .split('?')[0];

    console.log(`Connected to MongoDB Database (${MONGO_DB_NAME})`);
  }
}

// * EXPORTS
module.exports = connectToMongo;
