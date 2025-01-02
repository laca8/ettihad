const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    game: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    manager: {
      type: String,
      required: true,
    },
    nums: {
      type: String,
      required: true,
    },
    stadiums: [],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("gamed", gameSchema);
