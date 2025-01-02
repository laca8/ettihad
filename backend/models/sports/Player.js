const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema(
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
    contract_value: {
      type: String,
      required: true,
    },
    contract_value: {
      type: String,
      required: true,
    },
    bills_num: {
      type: String,
      required: true,
    },
    bill_value: {
      type: String,
      required: true,
    },
    bills_paid: {
      type: String,
      required: true,
    },
    bills_remaining: {
      type: String,
      required: true,
    },
    rewards: {
      type: String,
      required: true,
    },
    penalits: {
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
module.exports = mongoose.model("player", playerSchema);
