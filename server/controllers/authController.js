// in this file we are going to create end pointswhich will handle authenticationin and autherization request and login and sign up 
const router = require('express').Router();  //mini express object banata hai jo sirf routes handle karta hai.
const bcrypt = require('bcryptjs'); // password ko encrypt  karne ke liye
const User = require('./../models/user'); // user model import kar rahe hai


// SIGNUP ENDPOINT 
router.post('/signup', async (req, res) => {
  try {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).send({
        message: "User already exists",
        success: false
      });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // 3. Create and save user
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword
    });

    await newUser.save(); // save user in database

    // 4. Success
    res.status(201).send({
      message: "User created successfully",
      success: true
    });

  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false
    });
  }
});

module.exports = router;