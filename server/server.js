// server.js is main entry point of node js application , ye database se connect krega 
// server ko start krega aur app.js file ko import krega jaha pe sara logic likha hoga ki jab bhi koi request aayegi to uska kya response dena hai

const dotenv = require('dotenv'); //dotenv package that let our app read key value pair and store in config.env file


dotenv.config({path: './config.env'}); //Ye command config.env file padhta hai aur usme jo KEY=VALUE likha hai, unko process.env me add kar deta hai.
//instead of writting port directly in code , we hide in config.env 


const dbconfig = require('./config/dbConfig'); //importing db connection state (ye line likhne se hi dbConfig file me jo code hai wo execute ho jayega aur db connect ho jayega)

//importing app.js file 
//app.js file me sara logic likha hai ki jab bhi koi request aayegi to uska kya response dena hai 
//server.js file me sirf itna kaam hai ki app.js file ko import karna aur usko ek specific port pe listen karna
const  app = require('./app');


const port = process.env.PORT_NUMBER ||  5000; // value stored in port no environment variable is assigned to this port variable and if for some reason  node js is not able to read this value "process.env.PORT_NUMBER"  this expression will either return null or undefined so in that case 5000 will be assigned to this port number (Iska matlab: environment variable available ho to use karo, warna default 5000 lo.)

//process.env.PORT || 5000 likhne ka reason hai application ko crash hone se bachana jab environment variable set na ho.

//app.listen() listen method - makes our node js application ready for lisning to incoming request , we need to pass 2 argument **PORT NO** (on which we want to lisen the incoming request ) and second is call back function (this func will be executed when ever our node js application is ready for handling any incoming request )

app.listen(port, () => {
  console.log(`Listening to requests on PORT: ${port}`);
});