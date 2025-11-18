let mongoose = require("mongoose");

// Create a model
let habitModel = mongoose.Schema(
  {
    title: String,
    difficulty: String,
    frequency: String,
    purpose: String,
    notes: String,
    dateCreated: { type: Date, default: Date.now }
  },
  {
    collection: "HabitTracker"
  }
);

module.exports = mongoose.model("HabitTracker", habitModel);
