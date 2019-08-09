const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    user: {
      type: Map,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserSchema', UserSchema);
