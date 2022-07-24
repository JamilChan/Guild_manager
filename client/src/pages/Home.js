import React from 'react';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Home() {
	let navigate = useNavigate();

	const test = () => {
		Axios.get('https://reqbin.com/echo/get/json').then((response) => {
			console.log(response);
		})
	}

	return (
		<div>
			THIS IS THE HOME PAGE
			<Button variant="outline-primary">Primary</Button>{' '}
			<button onClick={() => {
				navigate('/login')
			}}> Login </button>
			<button onClick={test}> TEST </button>
		</div>
	)
}

export default Home