import React, {} from 'react'
import {BosslistButton} from '../styles/Bosslist.style';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Collapse(props) {
	const children = props.children;

	return (
		<Row>
			<Col sm={2}>




				<BosslistButton image={'/Shriekwing.png'} className="bg-dark text-end">Shriekwing</BosslistButton>
				<BosslistButton image={'/HuntsmanAltimor.png'} className="bg-dark text-end">Huntsman Altimor</BosslistButton>
				<BosslistButton className="bg-success text-center mt-1">+</BosslistButton>
			</Col>
			<Col>

			</Col>
		</Row>
	)
}

export default Collapse;