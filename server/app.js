


const express = require('express') ;  // express librrary ko import kro 

const app =  express();  // forms object of express ( object handle server and routes)


// going to call routers from authController.js
// first of all import the router
const authRouter = require('./controllers/authController'); 
const userRouter = require('./controllers/userController'); 
// now with some of request we will also recive req body that will be in json format , which needs to be converted to javascript object so that we can use it easily in our express application , so use middleware
 app.use(express.json()); // it will convert json to javascript object and then will pass to router 
 
// now we have imported the router so now use it 
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
// “Agar koi request /api/auth/ se start hoti hai, to usse authrouter handle karega.”
module.exports=app;


//Request → POST /api/auth/signup
//Ye automatically authController.js me jaayegi (kyunki tu authrouter waha se import kar chuki hai)... 