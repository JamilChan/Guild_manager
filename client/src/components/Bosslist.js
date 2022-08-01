import React, {useState, useEffect} from 'react'
import {BosslistButton} from '../styles/Bosslist.style';
import Axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import BossButton from './BossButton'
import ItemTableRow from './ItemTableRow'
import Button from 'react-bootstrap/Button';

function Collapse(props) {
	const [bosses, setBosses] = useState(props.children)
	const [bossIndex, setBossIndex] = useState(Object.keys(bosses).find((key) => bosses[key] !== undefined))
	const [rerenderstate, setRerenderstate] = useState(false)

	useEffect(() => {
		props.getRaidtierObject.current = () => {return bosses}
	})

	function addBoss() {
		const newBoss = {id:bosses.length, name: '', items: [], new: true}
    setBosses([...bosses, newBoss])
		props.getRaidtierObject.current = () => {return [...bosses, newBoss]}
  }

	const changeBossName = (data) => {
		bosses[data.id].name = data.name;
  }

	const changeBossIndex = (data) => {
		setBossIndex(data);
  }

	const deleteBoss = (id) => {
		Axios.delete(`http://localhost:3001/api/raidtiers/boss/delete/${id}`)
		handleDeleteBoss(id)
	}

	function addItem() {
    setBosses(prevBosses => {
			const copy = [...prevBosses]
			copy[bossIndex]?.items.push({id: bosses[bossIndex].items.length, name: '', type: 0, new: true})
			return copy
		})
  }

	const changeItem = (data) => {
		if(data.name) {bosses[bossIndex].items[data.id].name = data.name}
		if(data.type) {bosses[bossIndex].items[data.id].type = data.type}
  }

	const deleteItem = (id) => {
		Axios.delete(`http://localhost:3001/api/raidtiers/boss/item/delete/${id}`)
		handleDeleteItem(id)
	}

	const handleDeleteBoss = (id) => {
		let tempstate = bosses;

		delete tempstate[id]

		setBosses(tempstate)
		setRerenderstate(!rerenderstate)
	}

	const handleDeleteItem = (id) => {
		let tempstate = bosses

		delete tempstate[bossIndex].items[id];

		setBosses(tempstate)
		setRerenderstate(!rerenderstate)
	}

	return (
		<Row>
			<Col sm={3}>
				{bosses.map((item, i) => (item != null ? <BossButton inputChange={changeBossName} btnClick={changeBossIndex} deleteClick={deleteBoss} key={i}>{item}</BossButton> : null))}

				<BosslistButton className="bg-success text-center mt-1" onClick={addBoss}>+</BosslistButton>
			</Col>
			<Col>
				<div className='card'>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Name</th>
								<th>Item Type</th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{bosses[bossIndex]?.items.map((item, i) => (item != null ? <ItemTableRow itemtypes={props.itemtypes} func={changeItem} deleteClick={deleteItem} key={i}>{item}</ItemTableRow> : null))}
						</tbody>
					</Table>
					<Button className="w-100" variant="success" onClick={addItem}>+</Button>
				</div>
			</Col>
		</Row>
	)
}

export default Collapse;