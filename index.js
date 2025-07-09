const express = require('express')
const users = require('./mockdata.json')
const { dbConnect } = require("./config/mongoseConnection");

// handler
const app = express();
// port
const PORT = 8000;

// connecting to db
dbConnect()
  .then(() => {
    console.log("database connected succesfully");
    app.listen(PORT,()=>console.log("server started at PORT " + PORT))
  })
  .catch((error) => {
    console.log("EROR", error);
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

