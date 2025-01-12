const mongoose = require("mongoose");
const lectureSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    codeBoard: {
      type: String,
      required: true,
    },

    images: [],
    num: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("lecture", lectureSchema);
