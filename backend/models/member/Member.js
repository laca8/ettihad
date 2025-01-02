const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    national_Id: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    notes: {
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
    job: {
      type: String,
      required: true,
    },
    address_work: {
      type: String,
      required: true,
    },
    member_type: {
      type: String,
      required: true,
    },
    last_pay: {
      type: String,
      required: true,
    },
    member_status: {
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
module.exports = mongoose.model("member", memberSchema);
