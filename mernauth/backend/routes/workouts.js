import express from 'express';
import {
  createWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} from '../controllers/workoutController.js';
const router = express.Router();

router.get('/', getWorkouts);

router.get('/:id', getWorkout);

router.post('/', createWorkout);

router.delete('/:id', deleteWorkout);

router.patch('/:id', updateWorkout);
// module.exports = router;
export default router;
