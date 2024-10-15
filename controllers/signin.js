const Users = require("./../models/users");
var bcrypt = require("bcryptjs");

const handleSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await Users.findOne({ email });
    console.log(user.password);
    if (!user) {
      return res.status(400).send("Invalid username or password");
    }
    const secPass = user.password;
    const result = bcrypt.compareSync(password, secPass);
    console.log(result);
    if (result) {
      console.log("success");
      res.status(200).json(user);
    }
    // Compare the input password with the hashed password in the database
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  handleSignin: handleSignin,
};
