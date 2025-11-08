// in this file we will write logic for connecting  to mongodb database

const mongoose = require('mongoose');
mongoose.connect(process.env.CONN_STRING); //connnection logic 
const db=mongoose.connection; // connection state 

// CHECK CONNECTION 
db.on('connected',()=>                     // if connection is successfull this connected event will happen 
{
    console.log('DataBase connection successfull');
}) 

db.on('error',()=>                     // if connection is not successfull this error event will happen 
{
    console.log('DataBase connection failed');
})

module.exports = db; // exporting db connection state