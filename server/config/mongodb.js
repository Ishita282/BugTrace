const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const db = process.env.MONGO_URI

const connect = async () => {
  try {
    await mongoose.connect(db);
    console.log("DataBase is connected successfully!!");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};


module.exports = connect;