const mongoose = require("mongoose");

// Office Schema
const OfficeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phones: [
    {
      type: { type: Number, required: true },
      num: { type: String, required: true },
      note: { type: String, default: "" },
    },
  ],
  state: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  zip: { type: String, required: false },
  active: { type: Boolean, default: true },
  days: { type: Number, default: -1 },
  addDate: { type: Date, default: Date.now() },
  addedBy: { type: String, default: "מנהל המערכת" },
  updateDate: { type: Date, default: null },
  updatedBy: { type: String, default: null },
});

// User Schema
const UserSchema = new mongoose.Schema({
  office_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Office",
    required: true,
  },
  fname: { type: String, required: true },
  mname: { type: String, default: "" },
  lname: { type: String, required: true },
  gender: { type: Number, required: true },
  idType: { type: Number, required: true },
  id: { type: String, required: false },
  role: { type: String, required: true },
  bar_id: { type: Number, required: false },
  state: { type: String, required: false },
  city: { type: String, required: true },
  address: { type: String, required: true },
  zip: { type: String, required: false },
  email: { type: String, required: true },
  phones: [
    {
      type: { type: Number, required: true },
      num: { type: String, required: true },
      note: { type: String, default: "" },
    },
  ],
  notes: { type: String, default: "" },
  password: { type: String, required: true },
  active: { type: Boolean, default: true },
  permissions: { type: [String], default: ["admin"] },
  addDate: { type: Date, default: Date.now() },
  addedBy: { type: String, default: "מנהל המערכת" },
  updateDate: { type: Date, default: null },
  updatedBy: { type: String, default: null },
});

const Office = mongoose.model("Office", OfficeSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { Office, User };
