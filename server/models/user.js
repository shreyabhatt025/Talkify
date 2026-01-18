// creating a schema using mongose (which is an ODM tool for mongo db)
//defining what properties we need for user object and what type of data we want to store in each property
// creating schema for user model
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
     lastname:{
        type:String,
        required:true
    },
     email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false,  //jab bhi hum user ka data db se fetch karenge to password field ko exclude kar dena chahiye , it will be not shown to us request
        minlength:6
    }
} ,{timestamps:true})


// now using this schema we are going to create a model and using that model mongose is going to create document in the user collection of our database

module.exports = mongoose.model('users',userSchema); //users is the name of collection in db where all user documents will be stored