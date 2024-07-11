import express from 'express';
const router = express.Router();
import Workout from '../models/workoutModel.js';

router.get('/', (req, res) => {
  console.log('Get All workouts');
  res.json({ msg: 'GET All workouts' });
});

router.get('/:id', (req, res) => {
  console.log('Get A particular workout detail');
  res.json({ msg: 'Get A particular workout detail' });
});

router.post('/', async (req, res) => {
  console.log('POST A new workout');
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json({ workout });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', (req, res) => {
  console.log('Delete A particular workout detail');
  res.json({ msg: 'Delete A particular workout detail' });
});

router.patch('/:id', (req, res) => {
  console.log('Update A particular workout detail');
  res.json({ msg: 'Update A particular workout detail' });
});
// module.exports = router;
export default router;
