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
    date: {
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
    par: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("lecture", lectureSchema);
