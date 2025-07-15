const mongoose = require("mongoose");

const dbConnect = async () => {
  await mongoose.connect(process.env.MONGO_URL);
};

module.exports = { dbConnect };




// to install mongodb whath this : https://youtu.be/8A8TVFPuEMU?si=1GooO5XXejrxV0DG