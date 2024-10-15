const express = require("express");
var cors = require("cors");
const app = express();
const db = require("./db");
const Users = require("./models/users");
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const Login = require("./models/login");
// const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// const db = knex ({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false },
//     host : process.env.DATABASE_HOST,
//     port : 5432,
//     user : process.env.DATABASE_USER,
//     password : process.env.DATABASE_PW,
//     database : process.env.DATABASE_DB
//   }
// });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("success");
});
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, salt, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.put("/image", (req, res) => {
  image.handleImage(req, res);
});
app.post("/imageurl", (req, res) => {
  image.handleApi(req, res);
});

///////////////////////////////bcrypt Async Method///////////////////////////////////////

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

/////////////////////////////////////////////////////////////////////////////////////////////

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
