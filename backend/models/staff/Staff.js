const mongoose = require("mongoose");
const staffSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    game: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    national_Id: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    game: {
      type: String,
      required: true,
    },
    phone1: {
      type: String,
      required: true,
    },
    phone2: {
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
module.exports = mongoose.model("staff", staffSchema);
