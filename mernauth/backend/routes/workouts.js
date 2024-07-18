import express from 'express';
import {
  createWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
} from '../controllers/workoutController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

//Protect all api routes below by registering and using the requireAuth middleware function above the rest

router.use(requireAuth);

router.get('/', getWorkouts);

router.get('/:id', getWorkout);

router.post('/', createWorkout);

router.delete('/:id', deleteWorkout);

router.patch('/:id', updateWorkout);
// module.exports = router;
export default router;
