import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

	let [authToken, setAuthToken] = useState(() => localStorage.getItem('token') ? localStorage.getItem('token') : null)
	let [user, setUser] = useState(()=> localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')) : null)
	let [loading, setLoading] = useState(true)

	const navigate = useNavigate();


	let loginUser = (e) => {
		e.preventDefault();

		Axios.post('http://localhost:3002/login', {
      username: e.target.emaillogin.value,
      password: e.target.passwordlogin.value,
    }).then((response) => {
			if(!response.data.auth) {
				alert(response);
			} else {
				console.log(response);
				localStorage.setItem('token', response.data.token)
				setUser(response.data.result[0])
				setAuthToken(response.data.token)
				navigate('/')
			}
		})
	}

	let logoutUser = () => {
		localStorage.removeItem('token')
		setUser(null)
		setAuthToken(null)
		navigate('/login')
	}

	let regUser = (e) => {
		e.preventDefault();

    Axios.post('http://localhost:3002/register', {
      username: e.target.emailreg.value,
			password: e.target.passwordreg.value,
    }).then((response) => {
			console.log(response);
		})
	}


	let contextData = {
		user: user,
		authToken: authToken,
		regUser: regUser,
		loginUser: loginUser,
		logoutUser: logoutUser,
	}

	useEffect(()=> {

		if(authToken){
			setUser(jwt_decode(authToken))
		}
		setLoading(false)

	}, [authToken, loading])

	return(
		<AuthContext.Provider value={contextData}>
			{loading ? null : children}
		</AuthContext.Provider>
	)
}