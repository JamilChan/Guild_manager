import React, {useState, useContext} from 'react'
import Axios from 'axios';
import AuthContext from '../../context/AuthContext'
import CharacterlistContext from '../../context/CharacterlistContext'
import {validbnettoken, spaceToSlug} from '../../helpers/Helper'
import ListOfCharacters from '../../components/bnet/ListOfCharacters'
import {useQuery} from '@tanstack/react-query'

import Button from 'react-bootstrap/Button';

function Create() {
	const [guildname, setGuildname] = useState('')
	const [guildserver, setGuildserver] = useState('')
	const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
	const {submitList, setGuild, setCardtitel, setWowAccounts, setShowSubmit} = useContext(CharacterlistContext)


	let {user} = useContext(AuthContext)

	const {
		isLoading,
  } = useQuery(["createguild"], () => {
		return Axios.get('http://localhost:3001/api/user/bnet/characters/get', {params: {id: user.id}}).then(response => {
			setGuild([{'nothing': 'nothing'}])
			setCardtitel('Select a character to be Guild Master')
			setWowAccounts(response.data.wow_accounts)
			setShowSubmit(false)
		}).catch(error => {
			setWowAccounts([])
			console.log(error.response.data);
		})
  });

	const createPermissions = () => {
		validbnettoken(user.id, (tokenexist) => {
			if(tokenexist) {
				Axios.get('http://localhost:3001/api/guild/create/permission/check', {params: {userid: user.id, guildname: spaceToSlug(guildname), guildserver: spaceToSlug(guildserver)}}).then(hasPermission => {
					if(!hasPermission) return;

					Axios.post('http://localhost:3001/api/guild/create', {
						guildname: spaceToSlug(guildname),
						guildserver: spaceToSlug(guildserver),
					}).then((response) => {
						console.log(response);
					})
				}).catch(error => {
					console.log(error.response.data); // TEMP MAKE TEXT IN UI THAT PRINTS THIS SHIT AND REMOVES ON CHANGES
				})
			} else {
				const redirectUriString = encodeURIComponent(`http://localhost:3001/oauth/accesstoken/get`);
				// PLACEHOLDER STATE UNTILL I FIND A REAL SOLUTION
				window.location.replace(`https://oauth.battle.net/authorize?client_id=${CLIENT_ID}&scope=wow.profile&redirect_uri=${redirectUriString}&response_type=code&state=${user.id}`)
			}
		})
	}

	const getInvitetoken = (invitetoken) => {
		return invitetoken
	}


	if (isLoading) {
		return <h1> Loading...</h1>;
	}

	return (
		<div>
			<ListOfCharacters getInvitetoken={getInvitetoken}></ListOfCharacters>

			<label>Guildname</label>
			<input type="text" onChange={(e) => {setGuildname(e.target.value)}} disabled={submitList?.length === 0}></input>
			<label>Server</label>
			<input type="text" onChange={(e) => {setGuildserver(e.target.value)}} disabled={submitList?.length === 0}></input>

			<Button className='btn-alert' onClick={createPermissions}>Create guild</Button>
		</div>
	)
}

export default Create