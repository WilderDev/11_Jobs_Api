// * IMPORTS
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { model, Schema } = require('mongoose');

// * MODEL
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    maxlength: 50,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

// * METHODS
// Salt & Hash Password Before Save New User
UserSchema.pre('save', async function () {
  // 1. Salt the password
  const salt = await bcrypt.genSalt(9);

  // 2. Save the hashed password
  this.password = await bcrypt.hash(this.password, salt);
});

// Create JWT Method
UserSchema.methods.genJWT = function () {
  console.log('RUNNING!');

  // Sign a JWT with our info
  const jwtToken = jwt.sign(
    {
      id: this._id,
      name: this.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    },
  );

  // Send the signed JWT Back
  return jwtToken;
};

// Compare Incoming Password w/ DB Password
UserSchema.methods.comparePasswords = async function (incomingPassword) {
  const isMatch = await bcrypt.compare(incomingPassword, this.password);

  return isMatch;
};

// * EXPORTS
module.exports = model('User', UserSchema);
