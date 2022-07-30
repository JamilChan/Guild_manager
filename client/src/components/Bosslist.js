import React, {useState, useEffect} from 'react'
import {BosslistButton} from '../styles/Bosslist.style';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import BossButton from './BossButton'
import ItemTableRow from './ItemTableRow'
import Button from 'react-bootstrap/Button';

function Collapse(props) {
	const [bosses, setBosses] = useState(props.children)
	const [bossIndex, setBossIndex] = useState(Object.keys(bosses).find((key) => bosses[key] !== undefined))

	function addBoss() {
    setBosses([...bosses, {name: '', items: []}])
  }

	function addItem() {
    setBosses(prevBosses => {
			const copy = [...prevBosses]
			copy[bossIndex].items.push({id: null, name: '', stat: '', type: 0})
			return copy
		})
  }

	return (
		<Row>
			<Col sm={3}>
				{bosses.map((item, i) => (item != null ? <BossButton key={i}>{item}</BossButton> : null))}

				<BosslistButton className="bg-success text-center mt-1" onClick={addBoss}>+</BosslistButton>
			</Col>
			<Col>
				<div className='card'>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Name</th>
								<th>Item Type</th>
								<th>Item Stat</th>
							</tr>
						</thead>
						<tbody>
							{bosses[bossIndex]?.items.map((item, i) => (item != null ? <ItemTableRow key={i}>{item}</ItemTableRow> : null))}
						</tbody>
					</Table>
					<Button className="w-100" variant="success" onClick={addItem}>+</Button>
				</div>
			</Col>
		</Row>
	)
}

export default Collapse;