// * IMPORTS
const { Schema, model, Types } = require('mongoose');

// * MODEL
const JobSchema = new Schema(
  {
    // Title
    title: {
      type: String,
      required: true,
      maxlength: 255,
    },
    // Description
    description: {
      type: String,
      maxlength: 1024,
    },
    // Status
    status: {
      type: String,
      enum: ['Backlog', 'In Progress', 'Complete'],
      default: 'Backlog',
    },
    // author
    author: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// * EXPORTS
module.exports = model('Job', JobSchema);
