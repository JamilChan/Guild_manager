import React, {useState} from 'react'
import Bosslist from './Bosslist'
import Axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk, faTrashCan } from '@fortawesome/free-solid-svg-icons'


function Collapse(props) {
	const [raidtiername, setRaidtiername] = useState(props.children.name)
	const [raidtier, setRaidtier] = useState(props.children)
	const getRaidtierObject = React.useRef(null)

	const updateRaidtier = () => {
		Axios.put('http://localhost:3001/api/raidtiers/update', raidtier).then(response => {
			if(response) {
				let tempraidtier = raidtier;
				tempraidtier.new = false;

				tempraidtier.bosses.map(boss => {
					if(boss) { boss.new = false }

					boss?.items.map(item => {
						if(item) { item.new = false }
						return null;
					})
					return null
				})
				setRaidtier(tempraidtier)
			}
		})
	}

	const deleteRaidtier = (id) => {
		Axios.delete(`http://localhost:3001/api/raidtiers/delete/${id}`)
	}

	return (
		<Accordion.Item eventKey={raidtier.id}>
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
					updateRaidtier();
				}}/>
				<FontAwesomeIcon className='btn btn-danger ms-2' icon={faTrashCan} onClick={(e) => {
					e.stopPropagation();

					deleteRaidtier(raidtier.id);
					props.handleDelete(raidtier.id)
				}}/>
			</Accordion.Header>
			<Accordion.Body>
				<Bosslist itemtypes={props.itemtypes} getRaidtierObject={getRaidtierObject}>{raidtier.bosses}</Bosslist>
			</Accordion.Body>
		</Accordion.Item>
	)
}

export default Collapse;