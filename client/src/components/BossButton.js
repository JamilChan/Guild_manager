import React, {useState} from 'react'
import {BosslistButton} from '../styles/Bosslist.style';


function Collapse(props) {
	const children = props.children;
	// const [bossname, setBossname] = useState(children.name)

	return (
		<BosslistButton image={`/${children.name.split(" ").join("")}.png`} className="bg-dark">
			<input type="text" className=' text-end' defaultValue={children.name} />
		</BosslistButton>
	)
}

export default Collapse;