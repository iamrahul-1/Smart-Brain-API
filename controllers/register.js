
const handleRegister = (req, res, db, bcrypt) => {
	const {email, password, name} = req.body;
	if (!email || !password || !name) {
		return res.status(400).json('incorrect form submission') // we use return to stop the compiler from continuing
	}
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users') //return ??
				.returning('*') //do we need this? 
				.insert({    //knex('books').insert({title: 'Slaughterhouse Five'})
					name: name,
					email: loginEmail[0].email,
					joined: new Date()
			}).then(user => {
				console.log(user)
				res.json(user[0])
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
		.catch(err => res.status(400).json('unable to register'));   
	// return db('users') //return ??
	// 	.returning('*') //do we need this? 
	// 	.insert({    //knex('books').insert({title: 'Slaughterhouse Five'})
	// 		name: name,
	// 		email: email,
	// 		joined: new Date()
	// }).then(user => {
	// 	res.json(user[0])
	// })
}
module.exports = {
	handleRegister: handleRegister
};