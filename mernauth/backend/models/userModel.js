import mongoose from 'mongoose'; //Mongoose is ORM for MongoDB
const Schema = mongoose.Schema; //Define schema as a Mongoose Schema
import bcrypt from 'bcrypt'; //Tool for encrypting passwords

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

//MongoDB/Mongoose lets us create our own methods in the model, here we create one called signup

userSchema.statics.signup = async function (email, password) {
  //check if email already exists
  //User collection is exported only at the last line of this file and hence it is not available. So we use the this keyword
  //Also note that we are using the regular function type declaration using function keyword for this operator to work. If we used an arrow fucntion this won't work

  const email_exists = await this.findOne({ email }); //async code awaiting db action
  if (email_exists) {
    throw Error('Email already in use.'); //can't send res.status now so just throw an error now as User isnt available yet
  }
  //salt is a random string added to plain passwords so that ven same passwords wont have the same hash
  const salt = await bcrypt.genSalt();
  //send salt and passwords to bcrypt hash to generate the new hashed password and write only the hashed password to db
  const hash = await bcrypt.hash(password, salt);
  //create a new mongodb document here
  const user = await this.create({ email, password: hash });

  return user;
};
export default mongoose.model('User', userSchema); //Export the model as a mongoose schema for use in the usercontroller.js
