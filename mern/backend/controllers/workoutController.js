import Workout from '../models/workoutModel.js';
import mongoose from 'mongoose';

// GET all workouts
const getWorkouts = async (req, res) => {
  console.log('Getting all workouts');
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};
// GET a single workoutModel
const getWorkout = async (req, res) => {
  console.log('Get A particular workout detail');
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No such workout found' });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    res.status(404).json({ error: 'No such workout found' });
  }
  res.status(200).json(workout);
};
// Create a new Workout

const createWorkout = async (req, res) => {
  console.log('POST A new workout');
  const { title, reps, load } = req.body;
  //add doc to db
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json({ workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a single workout
const deleteWorkout = async (req, res) => {
  console.log('Deleting this workout');
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No such workout found' });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    res.status(404).json({ error: 'No such workout found' });
  }
  res.status(200).json(workout);
};

// Update a workout
const updateWorkout = async (req, res) => {
  console.log('Updating this workout');
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No such workout found' });
  }
  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    res.status(404).json({ error: 'No such workout found' });
  }
  res.status(200).json(workout);
};

export { createWorkout, getWorkouts, getWorkout, updateWorkout, deleteWorkout };
