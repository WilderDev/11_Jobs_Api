// * IMPORTS
const { model, Schema } = require('mongoose');

// * MODEL
const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

// * METHODS
// TODO: Salt & Hash Password Before Save New User

// TODO: Create JWT Method

// TODO: Compare Incoming Password w/ DB Password

// * EXPORTS
module.exports = model('User', UserSchema);
