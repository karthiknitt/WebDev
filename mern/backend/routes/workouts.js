import express from 'express';
import {
  createWorkout,
  getWorkout,
  getWorkouts,
} from '../controllers/workoutController.js';
const router = express.Router();

router.get('/', getWorkouts);

router.get('/:id', getWorkout);

router.post('/', createWorkout);

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
