import React, {useState} from 'react'
import {NavbarContainer, LeftContainer, RightContainer, NavbarInnerContainer, NavbarExtendedContainer, NavbarLinkContainer, NavbarLink, Logo, OpenLinksButton, NavbarLinkExtended} from '../styles/Navbar.style'
import logoimg from '../assets/mE.png'

function Navbar() {

	const [extendNavbar, setExtendNavbar] = useState(false);

	return (
		<NavbarContainer extendNavbar={extendNavbar}>
			<NavbarInnerContainer>
				<LeftContainer>
					<NavbarLinkContainer>
						<NavbarLink to='/'>Home</NavbarLink>
						<NavbarLink to='/profile'>Profile</NavbarLink>

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
				<NavbarLinkExtended to='/profile'>Profile</NavbarLinkExtended>
			</NavbarExtendedContainer>
			)}
		</NavbarContainer>
	)
}

export default Navbar