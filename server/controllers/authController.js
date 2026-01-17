// in this file we are going to create end pointswhich will handle authenticationin and autherization request and login and sign up 
const router = require('express').Router();  //mini express object banata hai jo sirf routes handle karta hai.
const bcrypt = require('bcryptjs'); // password ko encrypt  karne ke liye
const User = require('./../models/user'); // user model import kar rahe hai
const jwt = require('jsonwebtoken'); // json web token ko import kar rahe hai jo authentication ke liye use hota hai line76 



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
}) 

// LOGIN ENDPOINT API 
router.post('/login', async (req, res) => {
    // logicc for login  
  try{
       
        // check if user exists 

        const user = await User.findOne({email:req.body.email});
        if(!user) // if user doesnt exist 
        {
            return res.send({
                message: "User does not exist",
                success: false         
              }); 
        }


        // if user exist then check if password is correct 
        const isvalid = await bcrypt.compare(req.body.password,user.password); 
        if(!isvalid) // if password is incorrect
        {
            return res.send({  
                message: "Incorrect Password",
                success: false          // means user in not logged in
              });
        }

        //if email exist and password is correct then we are going to authenticate user , we are going to create authentication token using jwt and send that token in response 

        // npm i jsonwebtoken = ye package install karna hai
        // to create jsonwebtoken we need 2 things DATA , SECRET KEY ( cretaed in config.env file L3)

        const token = jwt.sign({
          userId: user._id} , process.env.SECRET_KEY , {expiresIn: "1d"} ); 

          res.send({
            message: "User logged in successfully",
            success: true,          // means user is logged in 
            dtoken :  token             // ye token hum client ko bhej rahe hai jise wo apne local storage me rakh lega 
          }); 
      




   }catch(error)
   {
    res.send({
        message: error.message,
        success: false          // means user in not logged in 
      }); 
   }
});

module.exports = router;