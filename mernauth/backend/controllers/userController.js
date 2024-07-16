//import the mongoose schema model from the userModel to acess the users collection from MongoDB
import User from '../models/userModel.js';

//login user controller function logic
const loginUser = async (req, res) => {
  res.json({ msg: 'User Logged In' });
};
//signup user controller function logic
const signupUser = async (req, res) => {
  //Get a copy of of email and password submitted from the req's body and destructure
  const { email, password } = req.body;
  try {
    //get a single instance of object user submitted by invoking the signup function on the imported User object collection
    const user = await User.signup(email, password);
    //return a status of 200 ok and an email,single user object
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message }); //display error status and the messgae from the throw error function of signup static function
  }
};

export { loginUser, signupUser }; //export both functions for use in users.js
