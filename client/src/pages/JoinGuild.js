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
	let navigate = useNavigate();

	useEffect(() => {
		if(invitetoken) {
			Axios.get('http://localhost:3001/api/user/characters/joinguild', {params: {invitetoken: invitetoken}}).then(response => {
				if(response) {
					setGuild(response.data);

					if(response.data.length > 0) {
						Axios.get('http://localhost:3001/api/user/characters/get', {params: {id: id}}).then(response => {
							if(response) {
								let temparr = []

								response.data.map((character) => {
									temparr.push({labelKey: character.charid, value: character.charname, icon: character.classname.toLowerCase().replace(' ', '-'), style: {'display': 'flex', "backgroundColor":"#d3d3d3", "color": "#FFFFFF"}})
									return null;
								})

								setOptions(temparr)
							}
						})
					}
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