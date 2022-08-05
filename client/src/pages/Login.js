import React, { useContext } from 'react';
import '../App.css';
import AuthContext from '../context/AuthContext'

function App() {
  let {loginUser, regUser} = useContext(AuthContext)

  return (
    <div className="App">
      <div className="login">
				<form onSubmit={loginUser}>
          <h1>Login</h1>
          <label>Username</label>
          <input type="text" name='emaillogin'></input>
          <label>Password</label>
          <input type="text" name='passwordlogin'></input>
          <input type="submit" />
        </form>
			</div>

      <div className="registration">
				<form onSubmit={regUser}>
					<h1>Registration</h1>
					<label>Username</label>
					<input type="text" name='emailreg'></input>
					<label>Password</label>
					<input type="text" name='passwordreg'></input>
					<input type="submit" />
        </form>
			</div>
    </div>
  );
}

export default App;