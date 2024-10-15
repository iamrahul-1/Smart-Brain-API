// const handleRegister = (req, res, db, bcrypt) => {
// 	const {email, password, name} = req.body;
// 	if (!email || !password || !name) {
// 		return res.status(400).json('incorrect form submission') // we use return to stop the compiler from continuing
// 	}
// 	const hash = bcrypt.hashSync(password);
// 	db.transaction(trx => {
// 		trx.insert({
// 			hash: hash,
// 			email: email
// 		})
// 		.into('login')
// 		.returning('email')
// 		.then(loginEmail => {
// 			return trx('users') //return ??
// 				.returning('*') //do we need this?
// 				.insert({    //knex('books').insert({title: 'Slaughterhouse Five'})
// 					name: name,
// 					email: loginEmail[0].email,
// 					joined: new Date()
// 			}).then(user => {
// 				console.log(user)
// 				res.json(user[0])
// 			})
// 		})
// 		.then(trx.commit)
// 		.catch(trx.rollback)
// 	})
// 		.catch(err => res.status(400).json('unable to register'));
// 	// return db('users') //return ??
// 	// 	.returning('*') //do we need this?
// 	// 	.insert({    //knex('books').insert({title: 'Slaughterhouse Five'})
// 	// 		name: name,
// 	// 		email: email,
// 	// 		joined: new Date()
// 	// }).then(user => {
// 	// 	res.json(user[0])
// 	// })
// }

const Users = require("../models/users");
var bcrypt = require("bcryptjs");

const handleRegister = async (req, res) => {
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(password, salt);
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: secPass,
  };
  try {
    const newPerson = new Users(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json("internal server error");
    console.log(error);
  }
};

module.exports = {
  handleRegister: handleRegister,
};
