const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/";

const dbConnect = async () => {
  await mongoose.connect(url);
};

module.exports = { dbConnect };




// to install mongodb whath this : https://youtu.be/8A8TVFPuEMU?si=1GooO5XXejrxV0DG