import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

	const [usernameReg, setUsernameReg] = useState('');
	const [passwordReg, setPasswordReg] = useState('');

	const [usernameLogin, setUsernameLogin] = useState('');
	const [passwordLogin, setPasswordLogin] = useState('');

	const [loginStatus, setLoginStatus] = useState(false);

	Axios.defaults.withCredentials = true;

	const register = () => {
    Axios.post('http://localhost:3002/register', {
      username: usernameReg,
      password: passwordReg
    }).then((response) => {
			console.log(response);
		})
	}

	const login = () => {
    Axios.post('http://localhost:3002/login', {
      username: usernameLogin,
      password: passwordLogin
    }).then((response) => {
			if(!response.data.auth) {
				setLoginStatus(false)
			} else {
				localStorage.setItem('token', response.data.token)
				setLoginStatus(true)
			}
		})
	}

	useEffect(() => {
		Axios.get('http://localhost:3002/login').then((response) => {
			if(response.data.loggedIn === true) {
				setLoginStatus(true)
			}
		})
	}, []);

	const userAuthenticated = () => {
		Axios.get('http://localhost:3002/isUserAuthenticatedPlaceholder', {
			headers: {
				'x-access-token': localStorage.getItem('token')
			},
		}).then(response => {
			console.log(response);
		})
	}

  return (
    <div className="App">
      <div className="login">
				<h1>Login</h1>
				<label>Username</label>
				<input type="text" onChange={(e) => {
					setUsernameLogin(e.target.value)
				}}></input>
				<label>Password</label>
				<input type="text"  onChange={(e) => {
					setPasswordLogin(e.target.value)
				}}></input>
				<button onClick={login}>Login</button>
			</div>

      <div className="registration">
				<h1>Registration</h1>
				<label>Username</label>
				<input type="text" onChange={(e) => {
					setUsernameReg(e.target.value)
				}}></input>
				<label>Password</label>
				<input type="text" onChange={(e) => {
					setPasswordReg(e.target.value)
				}}></input>
				<button onClick={register}>Register</button>
			</div>

			{loginStatus && (
				<button onClick={userAuthenticated}>Check if Authenticated</button>
			)}
    </div>
  );
}

export default App;