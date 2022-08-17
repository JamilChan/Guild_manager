import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import Axios from 'axios';
import {Link} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

function Guild() {
	const [guilds, setGuilds] = useState([])

	let {user} = useContext(AuthContext)

	useEffect(() => {
		Axios.get('http://localhost:3001/api/user/guilds/get', {params: {userid: user.id}}).then(response => {
			setGuilds(response.data);
		})
	}, [])

	function CustomToggle({ children, eventKey }) {
		const decoratedOnClick = useAccordionButton(eventKey, () =>
			console.log('totally custom!'),
		);

		return (
			<button
				type="button"
				style={{ backgroundColor: 'pink' }}
				onClick={decoratedOnClick}
			>
				{children}
			</button>
		);
	}

	const printNames = (guild) => {
		let listofnames = ''

		guild.characters.map(character => {
			if(character) {
				listofnames += `${character.name.toString()}, `;
			}
			return null
		})

		return listofnames.slice(0, -2)
	}

	return (
		<div>
			<Container>
				<Link className='btn btn-success rounded-0' to='/guild/create'>Create new guild</Link>
				{	guilds.map((guild, i) => {
					return guild != null &&
						<Accordion key={i}>
							<Card className='rounded-0'>
								<Card.Header>
									{guild.name} - {printNames(guild)}
									<CustomToggle eventKey={i}>Show loot sheet</CustomToggle>
								</Card.Header>
								<Accordion.Collapse eventKey={i}>
									<Card.Body>
										LOOT SHEET IN HERE
									</Card.Body>
								</Accordion.Collapse>
							</Card>
						</Accordion>
				})}
			</Container>
		</div>
	)
}

export default Guild