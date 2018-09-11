const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    guildID: {
      type: String,
      required: true,
      match: /^\d+$/
    },
    userID: {
      type: String,
      required: true,
      match: /^\d+$/
    },
    tag: {
      type: String,
      required: true,
      match: /^.*#\d{4}$/
    },
    xp: {
      type: Number,
      min: 0,
      default: 0
    },
    level: {
      type: Number,
      min: 0,
      default: 1
    },
    xpmultiplier: {
      type: Number,
      min: 1.00,
      default: 1.00
    },
    coins: {
      type: Number,
      min: 0,
      default: 0
    },
    coinmultiplier: {
      type: Number,
      min: 1.00,
      default: 1.00
    },
}, { collection: 'Users' });

module.exports = mongoose.model("User", userSchema);
