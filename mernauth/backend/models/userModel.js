import mongoose from 'mongoose'; //Mongoose is ORM for MongoDB
const Schema = mongoose.Schema; //Define schema as a Mongoose Schema

//Define the actual schema for the user. Email is unique. Both email and passwords are required fields.

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //adds the createdAt variable in the MongoDB collection
);

export default mongoose.model('User', userSchema); //Export the model as a mongoose schema for use in the usercontroller.js
