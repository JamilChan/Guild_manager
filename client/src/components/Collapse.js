import React, {useState} from 'react'
import Bosslist from './Bosslist'
import Axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


function Collapse(props) {
	const children = props.children;
	const [raidtiername, setRaidtiername] = useState('')

	const createUpdateRaidtier = () => {
		console.log(props.children);

		Axios.put('http://localhost:3001/api/createUpdateRaidtier', {
			
    })
	}

	return (
		<Accordion.Item eventKey={children.id}>
			<Accordion.Header>
				<input type="text" value={children.name} onChange={(e) => {setRaidtiername(e.target.value)}}/>
					<FontAwesomeIcon className='btn btn-success ms-2' icon={faCheck} onClick={(e) => {
						e.stopPropagation();
						createUpdateRaidtier();
					}}/>
			</Accordion.Header>
			<Accordion.Body>
				<Bosslist>{children}</Bosslist>
			</Accordion.Body>
		</Accordion.Item>
	)
}

export default Collapse;