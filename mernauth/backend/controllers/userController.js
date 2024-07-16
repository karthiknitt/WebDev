//import the mongoose schema model from the userModel to acess the users collection from MongoDB
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'; //import jwt from pkg

const create_token = _id => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

//login user controller function logic
const loginUser = async (req, res) => {
  //Get a copy of of email and password submitted from the req's body and destructure
  const { email, password } = req.body;
  try {
    //get a single instance of object user submitted by invoking the login statics function on the imported User object collection
    const user = await User.login(email, password);

    // create a token to be sent back using the inbuilt _id
    const token = create_token(user._id);
    //return a status of 200 ok and an email,jwt token
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message }); //display error status and the messgae from the throw error function of signup static function
  }
};
//signup user controller function logic
const signupUser = async (req, res) => {
  //Get a copy of of email and password submitted from the req's body and destructure
  const { email, password } = req.body;
  try {
    //get a single instance of object user submitted by invoking the signup statics function on the imported User object collection
    const user = await User.signup(email, password);

    // create a token to be sent back using the inbuilt _id
    const token = create_token(user._id);
    //return a status of 200 ok and an email,jwt token
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message }); //display error status and the messgae from the throw error function of signup static function
  }
};

export { loginUser, signupUser }; //export both functions for use in users.js
