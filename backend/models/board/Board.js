const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    num: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    achievement: [],
    members: [],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("board", boardSchema);
