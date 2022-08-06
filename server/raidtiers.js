require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const fetch = require('isomorphic-fetch');
const btoa = require('btoa');

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const TOKEN_ENDPOINT = 'https://eu.battle.net/oauth/token';

const redirectUri = 'http://localhost:3001/oauth/accesstoken/get';
const scopes = ['wow.profile'];

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
	const userid = req.body.userid;
	const guildid = req.body.guildid;

	req.body.characters.map((char) => {
		const sqlSelect = `
		SELECT
			id
		FROM
			characters
		WHERE
			user = ?
				AND
			wowid = ?
		`
		db.query(sqlSelect, [userid, char.id], (err, result) => {
			if(err) console.log(err);

			if(result.length > 0) {
				const sqlUpdate = "UPDATE characters SET guild = ? WHERE wowid = ?;"
				db.query(sqlUpdate, [guildid, char.id], (err, result) => {
					if(err) console.log(err);
					res.status(200).send({success: true})
				});
			} else {
				const sqlSelectClasses = `
				SELECT
					id
				FROM
					classes
				WHERE
					name = ?;
				`
				db.query(sqlSelectClasses, [char.playable_class.name], (err, result) => {
					const sqlCreate = "INSERT INTO characters (user, name, class, guild, wowid) VALUES (?, ?, ?, ?, ?)"
					db.query(sqlCreate, [userid, char.name, result[0].id, guildid, char.id], (err, result) => {
						if(err) console.log(err);
						res.send(result);
					})
				})
			}
		})
	})


})

//stolen

app.get('/oauth/accesstoken/get', async (req, res, next) => {
	let {code, state} = req.query;

	// build headers
	const basicAuth = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
	const headers = {
		authorization: `Basic ${basicAuth}`,
		'Content-Type': 'application/x-www-form-urlencoded'
	};
	// build request body
	const params = new URLSearchParams();
	params.append('redirect_uri', redirectUri);
	params.append('scope', scopes.join(' '));
	params.append('grant_type', 'authorization_code');
	params.append('code', code);

	// execute request
	const requestOptions = {
		method: 'POST',
		body: params,
		headers
	};
	const oauthResponse = await fetch(TOKEN_ENDPOINT, requestOptions);

	// handle errors
	if (!oauthResponse.ok) { // res.status >= 200 && res.status < 300
		console.log(`Token request failed with "${oauthResponse.statusText}"`);
		return next(new Error(oauthResponse.statusText));
	}

	// work with the oauth response
	const responseData = await oauthResponse.json();

	const sqlUpdate = "UPDATE users SET bnetaccesstoken = ? WHERE id = ?;"
	db.query(sqlUpdate, [responseData.access_token, state], (err, result) => {
		if(err) console.log(err);
	});

	// STORE ACCESS TOKEN IN DB ON USER WITH TIME. THEN REDIRECT TO THE PAGE WHERE YOU JOIN GUILD. AND THEN MAKE API CALL FOR CHARACTERS
	res.redirect(`http://localhost:3000/invite`);
});

app.get('/api/user/bnet/characters/get', async (req, res) => {
	let {id} = req.query

	const sqlSelect = `
	SELECT
		bnetaccesstoken as accesstoken
	FROM
		users
	WHERE
		id = ?;
	`
	db.query(sqlSelect, [id], async (err, result) => {
		const accesstoken = result[0].accesstoken
		const charactersResponse = await fetch(`https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=en_GB&access_token=${accesstoken}`)

		if (!charactersResponse.ok) { // res.status >= 200 && res.status < 300
			console.log(`Token request failed with "${charactersResponse.statusText}"`);
			return next(new Error(charactersResponse.statusText));
		}

		const responseData = await charactersResponse.json();

		res.json(responseData);
	})
});