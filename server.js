const express = require('express')
const users = require('./mockdata.json')
const { dbConnect } = require("./config/mongoseConnection");

const dotenv = require("dotenv");
dotenv.config(); // Load env variables before anything else
// handler
const app = express();
// port
const PORT = process.env.PORT;

// connecting to db
dbConnect()
  .then(() => {
    console.log("database connected succesfully");
    app.listen(PORT,()=>console.log("server started at PORT " + PORT))
  })
  .catch((error) => {
    console.log("EROR", error);
    process.exit(1); // Exit on failure
  });



// // get api 
// app.get('/users',(req,resp)=>{
//    return resp.json(users)
// })

// app.get('/users/:id', (req, resp) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
    
//     if (!user) {
//         return resp.status(404).json({ message: "User not found" });
//     }
//     return resp.json(user);
// });

