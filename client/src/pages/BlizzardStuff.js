import React from 'react'
import Axios from 'axios';

import Button from 'react-bootstrap/Button';

function BlizzardStuff() {

	const fetchCharacters = () => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const code = urlParams.get('code')

		Axios.get('http://localhost:3001/oauth/callback', {params: {code: code}}).then((response) => {
      const accesstoken = response.data.access_token;
			Axios.get(`https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=en_GB&access_token=${accesstoken}`).then(response => {
				console.log(response);
			})
		});
	}

	return (
		<div>
			<Button onClick={fetchCharacters}>
				Fetch Characters
			</Button>
		</div>
	)
}

export default BlizzardStuff