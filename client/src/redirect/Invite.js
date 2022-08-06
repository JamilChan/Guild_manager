import {useEffect} from 'react'

function Invite() {
	useEffect(() => {
		console.log(localStorage.getItem('invitetoken'));
		window.location.replace(`http://localhost:3000/invite/${localStorage.getItem('invitetoken')}`)
	}, [])
}
export default Invite