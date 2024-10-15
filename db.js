const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://admin:L38+$yzXsF.K*sd@smartbrain.1uk9y.mongodb.net/?retryWrites=true&w=majority&appName=smartbrain";

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to mongoDB server");
});

db.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
