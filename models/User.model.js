// * IMPORTS
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
// Salt & Hash Password Before Save New User
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

// Create JWT Method
UserSchema.methods.genJWT = function () {
  const signedToken = jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: '30d' },
  );

  return signedToken;
};

// Compare Incoming Password w/ DB Password
UserSchema.methods.comparePasswords = async function (incomingPassword) {
  const isMatch = await bcrypt.compare(incomingPassword, this.password);

  return isMatch;
};

// * EXPORTS
module.exports = model('User', UserSchema);
