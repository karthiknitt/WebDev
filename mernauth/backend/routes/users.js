import express from 'express'; //ES6 syntax for importing the express package
const router = express.Router(); //invoke the Express router and assign it to a variable

//import both controller functions to perform actions

import { loginUser, signupUser } from '../controllers/userController.js'; //import from userController by destructuring

router.post('/login', loginUser); //Setup a login route for users to log-in. POST method used to send data to server, take loginUser as argument from userController.js

router.post('/signup', signupUser); //Setup a signup route for new users to signin by creating an account.POST method used to send data to server,take signupUser as argument from userController.js

// export the router variable
export default router;
