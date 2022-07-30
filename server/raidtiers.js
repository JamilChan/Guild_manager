const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'your_current_password',
	database: 'rosterdatabase',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/raidtiers/get', (req, res) => {
	const sqlSelect = `
	SELECT
		raid_tier.id as raidid,
		raid_tier.name as raidname,
		bosses.id as bossid,
		bosses.name as bossname,
		raid_items.id as itemid,
		raid_items.id as itemid,
		raid_items.name as itemname,
		raid_items.boss as itemboss,
		raid_items.item_type as itemtype,
		raid_items.item_stat as itemstat
	FROM
		raid_tier
	LEFT JOIN
		bosses
			ON
				raid_tier.id=bosses.raid_tier
	LEFT JOIN
		raid_items
			ON
				bosses.id=raid_items.boss;
	`
	db.query(sqlSelect, (err, result) => {
		res.send(result)
	})
})

app.post('/api/raidtiers/insert', (req, res) => {
	const raidtierName = req.body.raidtierName;

	const sqlInsert = "INSERT INTO raid_tier (name) VALUES (?);"
	db.query(sqlInsert, [raidtierName], (err, result) => {
		console.log(err);
	});
});

app.delete('/api/delete/:delMovieName', (req, res) => {
	const movieName = req.params.delMovieName
	const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?;"
	db.query(sqlDelete, movieName, (err, result) => {
		if(err) console.log(err);
	});
})

app.put('/api/update', (req, res) => {
	const movieName = req.body.movieName
	const movieReview = req.body.movieReview
	const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?;"
	db.query(sqlUpdate, [movieReview, movieName], (err, result) => {
		if(err) console.log(err);
	});
})

app.listen(3001, () => {
	console.log('raidtiers, running on port 3001');
});