import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import CharacterlistContext from '../context/CharacterlistContext'
import ListOfCharacters from '../components/bnet/ListOfCharacters'
import Axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import {useParams} from 'react-router-dom'

function JoinGuild() {
	let navigate = useNavigate();
	const {invitetoken} = useParams();

	let {user} = useContext(AuthContext)
	const {setGuild, setCardtitel, setWowAccounts, setEmptyMessage} = useContext(CharacterlistContext)

	const { data: guilddata } = useQuery(['guild'], () => {
		setEmptyMessage('This invite link does not exist')
		return Axios.get('http://localhost:3001/api/user/characters/joinguild', {params: {invitetoken: invitetoken}}).then(response => response.data)
	})

	const { isLoading, isError, error } = useQuery(
		['characters', guilddata],
		() => {
			if(guilddata.length <= 0) return;

			setGuild(guilddata);
			setCardtitel(`Join ${guilddata[0].name}?`)

			return Axios.get('http://localhost:3001/api/user/bnet/characters/get', {params: {id: user.id}}).then(response => {
				setWowAccounts(response.data.wow_accounts)
				return response.data;
			}).catch(error => {
				setWowAccounts([])
				console.log(error.response.data);
			})
		}
	)

	const submitClick = (submitList, guild) => {
		Axios.put('http://localhost:3001/api/user/characters/update/guild', {characters: submitList, userid: user.id, guildid: guild[0].id}).then(response => {
			if(!response) return;

			navigate('/characters', { replace: true });
		})
	}

	if (isLoading) {
		return <h1> Loading...</h1>;
	}

	if (isError) {
    return <h1>Error: {error.message}</h1>
  }

	return (
		<ListOfCharacters submitClick={submitClick}></ListOfCharacters>
	)
}

export default JoinGuild