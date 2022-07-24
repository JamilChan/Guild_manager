import React, {useState, useEffect} from 'react'
import {NavbarContainer, LeftContainer, RightContainer, NavbarInnerContainer, NavbarExtendedContainer, NavbarLinkContainer, NavbarLink, Logo, OpenLinksButton, NavbarLinkExtended} from '../styles/Navbar.style'
import logoimg from '../assets/mE.png'
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";


function Navbar() {

	const [extendNavbar, setExtendNavbar] = useState(false);
	const [uid, setuid] = useState('');

	useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
			setuid(currentUser.uid);
    });
  })

	const str = `/profile/${uid}`

	return (
		<NavbarContainer extendNavbar={extendNavbar}>
			<NavbarInnerContainer>
				<LeftContainer>
					<NavbarLinkContainer>
						<NavbarLink to='/'>Home</NavbarLink>
						<NavbarLink to={str}>Profile</NavbarLink>
						<NavbarLink to='/login'>Login</NavbarLink>
						<NavbarLink to='/admin'>Admin</NavbarLink>

						<OpenLinksButton
							onClick={() => {
								setExtendNavbar((current) => !current);
							}}
						>
							{extendNavbar ? <>&#10005;</> : <>&#8801;</>}
						</OpenLinksButton>
					</NavbarLinkContainer>
				</LeftContainer>
				<RightContainer>
					<Logo src={logoimg}></Logo>
				</RightContainer>
			</NavbarInnerContainer>
			{extendNavbar && (
			<NavbarExtendedContainer>
				<NavbarLinkExtended to='/'>Home</NavbarLinkExtended>
				<NavbarLinkExtended to='/profile/{test}'>Profile</NavbarLinkExtended>
				<NavbarLinkExtended to='/login'>Login</NavbarLinkExtended>
				<NavbarLinkExtended to='/admin'>Admin</NavbarLinkExtended>
			</NavbarExtendedContainer>
			)}
		</NavbarContainer>
	)
}

export default Navbar