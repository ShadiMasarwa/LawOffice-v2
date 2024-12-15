const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  fname: String,
  mname: String,
  lname: String,
  gender: Number,
  idType: Number,
  id: String,
  occupation: String,
  workat: String,
  state: String,
  city: String,
  address: String,
  zip: String,
  email: String,
  phones: [
    {
      type: { type: Number },
      num: String,
      note: String,
    },
  ],
  notes: String,
  addDate: String,
  addedBy: String,
});

module.exports = mongoose.model("Person", personSchema);
