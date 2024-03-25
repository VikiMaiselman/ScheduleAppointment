import mongoose from "mongoose";

let db;

/* ************ C O N F I G U R E   D A T A B A S E ************ */
async function initializeDatabase() {
  try {
    db = await mongoose.connect("mongodb://localhost:27017/Appointments");
  } catch (error) {
    console.error("Connection with database could not be established", error);
    throw error;
  }
}

module.exports = db;
module.exports = initializeDatabase;
