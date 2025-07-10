const express = require("express");
const dotenv = require("dotenv");
const { dbConnect } = require("./config/mongoseConnection");
const userRoutes = require("./routes/user.routes");


dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT;
// connecting to db
dbConnect()
  .then(() => {
    console.log("database connected succesfully");
    app.listen(PORT,()=>console.log("server started at PORT " + PORT))
  })
  .catch((error) => {
    console.error("EROR", error);
    process.exit(1); // Exit on failure
});










// *********** api using mock data **************
// get api 
app.get('/users',(req,resp)=>{
   return resp.json(users)
})
// get user by id
app.get('/user/:id', (req, resp) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    
    if (!user) {
        return resp.status(404).json({ message: "User not found" });
    }
    return resp.json(user);
});

