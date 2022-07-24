import React from 'react'
import {useParams} from 'react-router-dom'

function Profile() {

	let {username} = useParams();
	return (
		<div>THIS IS THE PROFILE PAGE OF {username}</div>
	)
}

export default Profile