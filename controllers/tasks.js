const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(201).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// Create a Task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// Get one single task
const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });

    if (!task) {
      return res.status(404).json({ msg: `No task found with the id ${id}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `The task with the id ${id} does not exist` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }

  res.send("Delete task");
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `The task with the id ${id} does not exist` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }

  res.send("Update task");
};

// Exporting modules
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
