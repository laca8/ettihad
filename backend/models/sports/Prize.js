const mongoose = require("mongoose");
const prizeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    player: {
      type: String,
      required: true,
    },
    position: {
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
    coach: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("prize", prizeSchema);
