const mongoose = require("mongoose");
const infraSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
    itemType: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    seller: {
      type: String,
      required: true,
    },
    buyer: {
      type: String,
      required: true,
    },
    num: {
      type: String,
      required: true,
    },
    total: {
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
module.exports = mongoose.model("infra", infraSchema);
