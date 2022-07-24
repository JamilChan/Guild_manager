const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')
const cookieParser= require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken')

const saltRounds = 10;

app.use(
	cors({
		origin: ['http://localhost:3000'],
		methods: ['GET', 'POST'],
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
	session({
		key: 'userId',
		secret: 'placeholder',
		resave: false,
		saveUninitialized: false,
		cookie: {
			expire: 60 * 60
		},
	})
);

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'your_current_password',
	database: 'rosterdatabase',
});

app.post('/register', (req, res) => {
	const username = req.body.username
	const password = req.body.password

	bcrypt.hash(password, saltRounds, (err, hash) => {
		if(err) { console.log(err); }

		db.query(
			'INSERT INTO users (username, password) VALUES (?,?);',
			[username, hash],
			(err, res) => {
				console.log(err);
			});
	});
});

const verifyJWT = (req, res, next) => {
	const token = req.headers['x-access-token']

	if(!token) {
		res.send('Need a token')
	} else {
		jwt.verify(token, 'placeholder1', (err, decoded) => {
			if(err){
				res.json({auth: false, message: 'You failed to Authenticate'})
			} else {
				req.userIId = decoded.id;
				next();
			}
		});
	}
}

app.get('/isUserAuthenticatedPlaceholder', verifyJWT, (req, res) => {
	res.send('You are Authenticated');
})

app.get('/login', (req, res) => {
	if(req.session.user) {
		res.send({loggedIn: true, user: req.session.user})
	} else {
		res.send({loggedIn: false})
	}
});

app.post('/login', (req, res) => {
	const username = req.body.username
	const password = req.body.password

	db.query(
		'SELECT * FROM users WHERE username = ?;',
		username,
		(err, result) => {
			if(err) {
				res.send({err: err})
			}

			if(result.length > 0) {
				bcrypt.compare(password, result[0].password, (err, response) => {
					if(response) {
						const id = result[0].id;
						const token = jwt.sign({id}, 'placeholder1', {
							expiresIn: 300,
						})
						req.session.user = result;

						res.json({auth: true, token: token, result: result})
					} else {
						res.json({auth: false, message: 'No user found placeholder'})
					}
				});
			} else {
				res.json({auth: false, message: 'No user found placeholder'})
			}
		}
	);
});

app.listen(3002, () => {
	console.log('running on port 3002');
});