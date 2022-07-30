import React, {useState} from 'react'
import Bosslist from './Bosslist'
import Axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'


function Collapse(props) {
	const children = props.children;
	const [raidtiername, setRaidtiername] = useState(children.name)

	const createRaidtier = () => {
		Axios.post('http://localhost:3001/api/raidtiers/create', {
			raidtiername: raidtiername,
			// raidtierbosses: raidtierbosses
		})
	}

	const updateRaidtier = () => {
		Axios.put('http://localhost:3001/api/raidtiers/update', {
			raidtiername: raidtiername,
			// raidtierbosses: raidtierbosses
		})
	}

	return (
		<Accordion.Item eventKey={children.name}>
			<Accordion.Header>
				<input
					type="text"
					className='w-25'
					defaultValue={raidtiername}
					onChange={(e) => {setRaidtiername(e.target.value)}}
					onClick={(e) => {
						e.stopPropagation();
					}}
				/>
				<FontAwesomeIcon className='btn btn-success ms-2' icon={faFloppyDisk} onClick={(e) => {
					e.stopPropagation();
					if(children.id) {
						updateRaidtier();
					} else {
						createRaidtier();
					}
				}}/>
			</Accordion.Header>
			<Accordion.Body>
				<Bosslist>{children.bosses}</Bosslist>
			</Accordion.Body>
		</Accordion.Item>
	)
}

export default Collapse;