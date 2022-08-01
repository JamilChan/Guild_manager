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
		raid_items.item_type as itemtype
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

app.put('/api/raidtiers/update', (req, res) => {
	let raidid = req.body.id
	const raidname = req.body.name

	if(!req.body.new) {
		const sqlUpdateRaid = "UPDATE raid_tier SET name = ? WHERE id = ?;"
		db.query(sqlUpdateRaid, [raidname, raidid], (err, result) => {
			if(err) console.log(err);
			iterateBoss(req.body, raidid)
		});
	} else {
		const sqlCreateRaid = "INSERT INTO raid_tier SET name = ?"
		db.query(sqlCreateRaid, [raidname], (err, result) => {
			if(err) console.log(err);
			iterateBoss(req.body, result.insertId)
		})
	}
	res.status(200).send({success: true})
})

app.delete('/api/raidtiers/delete/:id', (req, res) => {
	const id = req.params.id
	const sqlDelete = "DELETE FROM raid_tier WHERE id = ?;"
	db.query(sqlDelete, id, (err, result) => {
		if(err) console.log(err);
	});
})

app.delete('/api/raidtiers/boss/delete/:id', (req, res) => {
	const id = req.params.id
	const sqlDelete = "DELETE FROM bosses WHERE id = ?;"
	db.query(sqlDelete, id, (err, result) => {
		if(err) console.log(err);
	});
})

app.delete('/api/raidtiers/boss/item/delete/:id', (req, res) => {
	const id = req.params.id
	const sqlDelete = "DELETE FROM raid_items WHERE id = ?;"
	db.query(sqlDelete, id, (err, result) => {
		if(err) console.log(err);
	});
})

const iterateBoss = (raid, raidid) => {
	raid.bosses.map((boss) => {
		if(boss != null) {
			const bossid = boss.id;
			const bossname = boss.name;

			if(!boss.new) {
				const sqlUpdateBoss = "UPDATE bosses SET name = ? WHERE id = ?;"
				db.query(sqlUpdateBoss, [bossname, bossid], (err, result) => {
					if(err) console.log(err);
					iterateItem(boss, bossid)
				});
			} else {
				const sqlCreateBoss = "INSERT INTO bosses SET name = ?, raid_tier = ?;"
				db.query(sqlCreateBoss, [bossname, raidid], (err, result) => {
					if(err) console.log(err);
					iterateItem(boss, result.insertId)
				});
			}
		}
	})
}

const iterateItem = (boss, bossid) => {
	boss.items.map((item) => {
		if(item != null) {
			const itemid = item.id;
			const itemname = item.name;
			const itemtype = item.type;
			const itemstat = item.stat;

			if(!item.new) {
				const sqlUpdateItem = "UPDATE raid_items SET name = ?, item_type = ? WHERE id = ?;"
				db.query(sqlUpdateItem, [itemname, itemtype, itemid], (err, result) => {
					if(err) console.log(err);
				});
			} else {
				const sqlCreateItem = "INSERT INTO raid_items SET name = ?, item_type = ?, boss = ?;"
				db.query(sqlCreateItem, [itemname, itemtype, bossid], (err, result) => {
					if(err) console.log(err);
				});
			}
		}
	})
}

app.listen(3001, () => {
	console.log('raidtiers, running on port 3001');
});


// SHIT I DONT UNDERSTAND YET

app.get('/api/item_type/get', (req, res) => {
	const sqlSelect = `
	SELECT
		id as labelKey,
		item_type as value
	FROM
		item_type
	`
	db.query(sqlSelect, (err, result) => {
		res.send(result)
	})
})

app.get('/api/user/characters/get', (req, res) => {
	let userid = req.query.id

	const sqlSelect = `
	SELECT
		characters.id as charid,
		characters.name as charname,
		characters.class as charclass,
		characters.guild as charguild,
		guilds.name as guildname,
		classes.name as classname
	FROM
		characters
	LEFT JOIN
		guilds
			ON
				characters.guild = guilds.id
	LEFT JOIN
		classes
			ON
				characters.class = classes.id
	WHERE
		user = ?
	`
	db.query(sqlSelect, [userid], (err, result) => {
		if(err) console.log(err);
		res.send(result)
	})
})

app.get('/api/user/characters/joinguild', (req, res) => {
	let invitetoken = req.query.invitetoken

	const sqlSelect = `
	SELECT
		id,
		name
	FROM
		guilds
	WHERE
		invitetoken = ?
	`
	db.query(sqlSelect, [invitetoken], (err, result) => {
		if(err) console.log(err);
		res.send(result)
	})
})

app.put('/api/user/characters/update/guild', (req, res) => {
	let charid = req.body.charid
	let guildid = req.body.guildid

	const sqlUpdate = "UPDATE characters SET guild = ? WHERE id = ?;"
	db.query(sqlUpdate, [guildid, charid], (err, result) => {
		if(err) console.log(err);
		res.status(200).send({success: true})
	});
})