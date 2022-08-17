import React, {useEffect, useState, useContext} from 'react'
import Axios from 'axios';
import AuthContext from '../context/AuthContext'

import CharCard from '../components/CharCard';
import Container from 'react-bootstrap/Container';

function Characters() {
	let {user} = useContext(AuthContext)

	const [characters, setCharacters] = useState([])

	useEffect(() => {
		Axios.get('http://localhost:3001/api/user/characters/get', {params: {id: user.id}}).then(response => {
			if(response) {
				setCharacters(response.data)
			}
		})
	}, [])

	return (
		<div>
			<div>
				ADD CHARS
			</div>
			<div>
				<Container>
					{characters.map((character, i) => (character != null ? <CharCard key={i}>{character}</CharCard> : null))}
				</Container>
			</div>
		</div>
	)
}

export default Characters