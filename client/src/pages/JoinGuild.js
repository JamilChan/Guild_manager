import React, {useState, useEffect, useContext} from 'react'
import Axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

function JoinGuild() {
	const {invitetoken} = useParams();

	const [guild, setGuild] = useState([])
	const [wowAccounts, setWowAccounts] = useState([])
	const [submitList, setSubmitList] = useState([])

	const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

	let navigate = useNavigate();
	let {user} = useContext(AuthContext)

	useEffect(() => {
		Axios.get('http://localhost:3001/api/user/characters/joinguild', {params: {invitetoken: invitetoken}}).then(response => {
			if(response.data.length > 0) {
				setGuild(response.data);

				if(localStorage.getItem('invitetoken')) {
					localStorage.removeItem('invitetoken')

					Axios.get('http://localhost:3001/api/user/bnet/characters/get', {params: {id: user.id}}).then(response => {
						setWowAccounts(response.data.wow_accounts)
					})
				}
			}
		})
	}, [])

	const bnetlogin = () => {
		const redirectUriString = encodeURIComponent(`http://localhost:3001/oauth/accesstoken/get`);
		localStorage.setItem('invitetoken', invitetoken)
		// PLACEHOLDER STATE UNTILL I FIND A REAL SOLUTION
		window.location.replace(`https://oauth.battle.net/authorize?client_id=${CLIENT_ID}&scope=wow.profile&redirect_uri=${redirectUriString}&response_type=code&state=${user.id}`)
	}

	const addCharacterToSubmitList = (character) => {
		const exists = submitList.includes(character)

		if (exists) {
			setSubmitList(submitList.filter((char) => { return char !== character }))
		} else {
			setSubmitList([...submitList, character])
		}
	}

  const handleSubmit = () => {
		console.log(submitList);
		console.log(guild);
		Axios.put('http://localhost:3001/api/user/characters/update/guild', {characters: submitList, userid: user.id, guildid: guild[0].id}).then(response => {
			if(response) {
				navigate('/characters', { replace: true });
			}
		})
	}

	return (
		<div>
			<Container>
				{guild.length > 0 ?
				<Card>
					<Card.Body>
						<Card.Title>Join {guild[0].name}?</Card.Title>

						{ wowAccounts.length > 0 &&
							<Row xs={1} md={2} lg={3} className="g-4">
								{
									wowAccounts.map((account) => {
										return (
											account.characters.map((character, i) => {
												if(character.level === 60) {
													return (
														<Card
															className='bg-secondary'
															key={i}
															onClick={() => {
																addCharacterToSubmitList(character)
															}}
														>
															<Card.Body>
																<Card.Title>{character.name}</Card.Title>
																<Card.Subtitle>{character.realm.name}</Card.Subtitle>

															</Card.Body>
														</Card>
													)
												}

												return null;
											})
										)
									})
								}
							</Row>
						}

						{ wowAccounts.length === 0 &&
							<Button className='btn-alert' onClick={bnetlogin}>Get List of Characters</Button>
						}
					</Card.Body>
					{	submitList.length > 0 &&
						<Button className='btn-success rounded-0' onClick={handleSubmit}>Add to guild</Button>
					}
				</Card>
				:
				'This invite link does not exist'
				}
			</Container>
		</div>
	)
}

export default JoinGuild