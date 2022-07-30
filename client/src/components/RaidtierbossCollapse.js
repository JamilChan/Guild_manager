import React, {useState} from 'react'
import Bosslist from './Bosslist'
import Axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'


function Collapse(props) {
	const [raidtiername, setRaidtiername] = useState(props.children.name)
	const getRaidtierObject = React.useRef(null)
	let raidtier = props.children;

	const updateRaidtier = () => {
		Axios.put('http://localhost:3001/api/raidtiers/update', raidtier)
	}

	return (
		<Accordion.Item eventKey={raidtier.name}>
			<Accordion.Header>
				<input
					type="text"
					className='w-25'
					defaultValue={raidtiername}
					onChange={(e) => {
						setRaidtiername(e.target.value);
					}}
					onClick={(e) => {
						e.stopPropagation();
					}}
				/>
				<FontAwesomeIcon className='btn btn-success ms-2' icon={faFloppyDisk} onClick={(e) => {
					e.stopPropagation();
					raidtier.name = raidtiername;
					raidtier.bosses = getRaidtierObject.current();
					console.log(raidtier);
					updateRaidtier();
				}}/>
			</Accordion.Header>
			<Accordion.Body>
				<Bosslist getRaidtierObject={getRaidtierObject}>{raidtier.bosses}</Bosslist>
			</Accordion.Body>
		</Accordion.Item>
	)
}

export default Collapse;