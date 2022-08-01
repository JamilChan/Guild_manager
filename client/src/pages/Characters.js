import React, {useEffect, useState} from 'react'
import Axios from 'axios';

import CharCard from '../components/CharCard';
import Container from 'react-bootstrap/Container';

function Characters() {
	const id = 5;
	const [characters, setCharacters] = useState([])

	useEffect(() => {
		Axios.get('http://localhost:3001/api/user/characters/get', {params: {id: id}}).then(response => {
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