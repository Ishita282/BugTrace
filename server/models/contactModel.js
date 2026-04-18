const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  message: { type: String, required: true },

  type: {
    type: String,
    enum: ["bug", "help", "feature"],
    default: "help",
  },

  status: {
    type: String,
    enum: ["open", "resolved"],
    default: "open",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactSchema);