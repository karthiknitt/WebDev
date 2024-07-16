//import the mongoose schema model from the userModel to acess the users collection from MongoDB
import User from '../models/userModel.js';

//login user controller function logic
const loginUser = async (req, res) => {
  res.json({ msg: 'User Logged In' });
};
//signup user controller function logic
const signupUser = async (req, res) => {
  res.json({ msg: 'User Signed Up' });
};

export { loginUser, signupUser }; //export both functions for use in users.js
