import React, {useState, useEffect} from 'react'
import logoimg from '../assets/mE.png'
import {
  onAuthStateChanged,
	signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {

  const [user, setUser] = useState(null);

	useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
    });
  })

	const logout = async () => {
    await signOut(auth);
  };

	const str = `/profile/${user?.uid}`

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Container>
				<Navbar.Brand as={Link} to="/"><img
					alt=""
					src={logoimg}
					width="30"
					height="30"
					className="d-inline-block align-top"
				/>{' '}Guild Manager</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					{user == null ?
						<></>
						:
						<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: '100px' }}
						navbarScroll
						>
							<Nav.Link as={Link} to='/'>Loot</Nav.Link>
							<Nav.Link as={Link} to='/'>Guilds</Nav.Link>
						</Nav>
					}
					{user?.uid === "s7zP0awIr3frjriqiypTF9TeQ003" &&
					<Nav className="d-flex">
						<Nav.Link as={Link} to='/admin'>Admin</Nav.Link>
					</Nav>
					}
					{user == null ?
					<Nav className="d-flex">
						<Nav.Link as={Link} to='/login'>Login</Nav.Link>
					</Nav>
					:
					<Nav className="d-flex">
						<Nav.Link as={Link} to={str}>Profile</Nav.Link>
						<Nav.Link as={Link} to='/characters'>Characters</Nav.Link>
						<Nav.Link onClick={logout}>logout</Nav.Link>
					</Nav>
					}
					<Nav className="d-flex">
						<Nav.Link as={Link} to='/invite/qwertyuiop'>PLACEHOLDER Invite Link</Nav.Link>
					</Nav>
					<Nav className="d-flex">
						<Nav.Link as={Link} to='/blizzardstuff'>api testing</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default App