import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import AuthContext from '../../context/AuthContext'
import CharacterlistContext from '../../context/CharacterlistContext'

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

function ListOfCharacters(props) {
	const {invitetoken} = useParams();

	const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

	let {user} = useContext(AuthContext)
	const {submitList, setSubmitList, wowAccounts, guild, cardtitel, showSubmit} = useContext(CharacterlistContext)


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

	return (
		<div>
			<Container>
				{guild.length > 0 || wowAccounts.length === 0 ?
				<Card>
					<Card.Body>
						<Card.Title>{cardtitel}</Card.Title>

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
					{	submitList.length > 0 && showSubmit &&
						<Button className='btn-success rounded-0' onClick={() => props.submitClick(submitList, guild, user)}>Add to guild</Button>
					}
				</Card>
				:
				'This invite link does not exist'
				}
			</Container>
		</div>
	)
}

export default ListOfCharacters