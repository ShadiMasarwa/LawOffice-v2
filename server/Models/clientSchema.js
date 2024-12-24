const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  mname: { type: String, default: "" },
  lname: { type: String, default: "" },
  gender: { type: Number, default: 1 },
  idType: { type: Number, default: 1 },
  id: { type: String, default: "" },
  occupation: { type: String, default: "" },
  workat: { type: String, default: "" },
  state: { type: String, default: "" },
  city: { type: String, default: "" },
  address: { type: String, default: "" },
  zip: { type: String, default: "" },
  email: { type: String, default: "" },
  phones: [
    {
      type: { type: Number, default: 1 },
      num: { type: String, default: "" },
      note: { type: String, default: "" },
    },
  ],
  notes: { type: String, default: "" },
  addedBy: { type: String, required: true },
  addDate: { type: Date, required: true },
  updateDate: { type: Date, default: null },
  updateBy: { type: String, default: "" },
});

module.exports = mongoose.model("Person", clientSchema);
