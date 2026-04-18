const mongoose = require("mongoose");
const crypto = require("crypto");

const stepSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: {
    type: String,
    enum: ["action", "system", "error"],
  },
  state: String,
  order: Number,
});

const bugSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    guestId: {
      type: String,
      required: false,
    },
    shareToken: {
      type: String,
      default: () => crypto.randomUUID(),
      unique: true,
    },
    steps: [stepSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Bug", bugSchema);
