import express from 'express';
import dotenv from 'dotenv';
import workoutRoutes from './routes/workouts.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

//middleware usage here
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to MongoDB & Listening on Port # ${process.env.PORT}!`
      );
    });
  })

  .catch(error => {
    console.log(error);
  });

app.use('/api/workouts', workoutRoutes);

// app.get('/', (req, res) => {
//   res.json({ msg: 'Welcome to the app' });
// });
