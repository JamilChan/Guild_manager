import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BootstrapSelect from 'react-bootstrap-select-dropdown';

function JoinGuild() {
	const id = 5;

	const [guild, setGuild] = useState([])
	const [options, setOptions] = useState([])
	const [character, setCharacter] = useState({})
	const {invitetoken} = useParams();
	const redirectUriString = encodeURIComponent('http://localhost:3001/oauth/callback');
	const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
	let navigate = useNavigate();

	useEffect(() => {
		if(invitetoken) {
			Axios.get('http://localhost:3001/api/user/characters/joinguild', {params: {invitetoken: invitetoken}}).then(response => {
				if(response.data.length > 0) {
					setGuild(response.data);

					window.location.replace(`https://oauth.battle.net/authorize?client_id=${CLIENT_ID}&scope=wow.profile&redirect_uri=${redirectUriString}&response_type=code`)
						console.log('res');
						// if(res.data.length > 0) {
						// 	const queryString = window.location.search;
						// 	const urlParams = new URLSearchParams(queryString);
						// 	const code = urlParams.get('code')

						// 	// Axios.get('http://localhost:3001/oauth/callback', {params: {code: code}}).then((response) => {
						// 	// 	const accesstoken = response.data.access_token;
						// 	// 	Axios.get(`https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=en_GB&access_token=${accesstoken}`).then(response => {
						// 	// 		console.log(response);
						// 	// 	})
						// 	// });
						// }
				}
			})
		}
	}, [invitetoken])

  const handleSubmit = () => {
		Axios.put('http://localhost:3001/api/user/characters/update/guild', character).then(response => {
			if(response) {
				navigate('/characters', { replace: true });
			}
		})

	}

	const handleChange = (selectedOptions) => {
		setCharacter({charid: selectedOptions.selectedKey[0], guildid: guild[0].id})
	}


	return (
		<div>
			<Container>
				{guild.length > 0 ?
				<Card>
					<Card.Body>
						<Card.Title>Join {guild[0].name}?</Card.Title>
						<BootstrapSelect options={options} onChange={handleChange} />
					</Card.Body>
					<Button className='btn-success rounded-0' onClick={handleSubmit}>Add to guild</Button>
				</Card>
				:
				'This invite link does not exist'
				}
			</Container>
		</div>
	)
}

export default JoinGuild