const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// ℹ️ Handles password encryption
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ errorMessage: "Please provide your email." });
  }

  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

  if (!regex.test(password)) {
    return res.status(400).json( {
      myError:
        "Password needs to have between 8 and 20 characters, at least one number, one lowercase and one uppercase letter and a special character."
    });
  }


  // Search the database for a user with the email submitted in the form
  User.findOne({ email })
    .then((found) => {
      // If the user is found, send the message email is taken
      if (found) {
        return res.status(400).json( {
          myError:
            "Email already taken."
        })
        // const myError = new Error();
        // myError.name = "errorMensaje";
        // myError.message = "Email already taken.";
        // throw myError;
      }

      const salt = bcryptjs.genSaltSync(saltRounds);
      const hashedPassword = bcryptjs.hashSync(password, salt);

      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({ email, password: hashedPassword });
    })
    .then((createdUser) => {
      const user = {
         email: createdUser.email,
        _id: createdUser._id };
      res.status(201).json(user);
    })
    .catch((err) => {
      if(err.name === "userExists"){
        res.status(400).json({ message: myError.message });
    } else {
        res.status(500).json({ message: "Internal Server Error: error creating new user" })
    }
    });
});

// Login
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string 
  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {

      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." })
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcryptjs.compareSync(password, foundUser.password);

      if (passwordCorrect) { // login was successful

        // Deconstruct the user object to omit the password
        const { _id, email } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email };

        // Create and sign the token
        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        );

        // Send the token as the response
        res.json({ authToken: authToken });
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }

    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log(`req.payload`, req.payload);

  res.json(req.payload);
});

module.exports = router;
