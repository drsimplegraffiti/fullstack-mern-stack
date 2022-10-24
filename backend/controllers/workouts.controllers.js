const Workout = require('../models/workout.model');
const mongoose = require('mongoose');

exports.getAllWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;

    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    return res.status(200).json(workouts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getSingleWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        error: 'No such workout',
      });
    }

    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({
        error: 'No such workout',
      });
    }

    return res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    let emptyFields = [];

    if (!title) {
      emptyFields.push('title');
    }

    if (!load) {
      emptyFields.push('load');
    }

    if (!reps) {
      emptyFields.push('reps');
    }

    if (emptyFields.length > 0) {
      return res.status(400).json({
        error: 'Please fill in all fields',
        emptyFields,
      });
    }

    const user_id = req.user._id;
    const workout = await Workout.create({
      title,
      load,
      reps,
      user_id,
    });
    return res.status(201).json(workout);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        error: 'No such workout',
      });
    }

    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!workout) {
      return res.status(404).json({
        error: 'No such workout',
      });
    }
    return res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
exports.deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        error: 'No such workout',
      });
    }
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
      return res.status(400).json({
        error: 'No such workout',
      });
    }
    return res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
