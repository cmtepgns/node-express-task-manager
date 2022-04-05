const mongoose = require("mongoose");

// Schema : structure for documents
const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide a name"],
    trim: true,
    maxlength: [20, "Name can not exceed 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false
  },
});

// Model : interface for interaction (CRUD)
// name for the collection (s)
module.exports = mongoose.model("Task", TaskSchema);
