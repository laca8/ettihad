const mongoose = require("mongoose");
const coachSchema = new mongoose.Schema(
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
    sex: {
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
    named: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    contract_value: {
      type: String,
      required: true,
    },
    contract_date: {
      type: String,
      required: true,
    },
    experiance: {
      type: String,
      required: true,
    },
    contracts: {
      type: String,
      required: true,
    },
    rewards: {
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
module.exports = mongoose.model("coach", coachSchema);
