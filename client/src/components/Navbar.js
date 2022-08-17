import React, {useContext} from 'react'
import logoimg from '../assets/mE.png'
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthContext'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {

  const {user, logoutUser} = useContext(AuthContext);

	const str = `/profile/${user?.id}`

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
							<Nav.Link as={Link} to='/guild'>Guilds</Nav.Link>
						</Nav>
					}
					{user?.role === 'admin' &&
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
						<Nav.Link onClick={logoutUser}>logout</Nav.Link>
					</Nav>
					}
					<Nav className="d-flex">
						<Nav.Link as={Link} to='/invite/qwertyuiop'>PLACEHOLDER Invite Link</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default App