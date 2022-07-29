import React, {useState} from 'react'
import {BosslistButton} from '../styles/Bosslist.style';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BossButton from './BossButton'

function Collapse(props) {
	const [children, setChildren] = useState(props.children)

	function addComponent() {
    setChildren([...children, {name: '', items: []}])
  }

	return (
		<Row>
			<Col sm={3}>
				{children.map((item, i) => (item != null ? <BossButton key={i}>{item}</BossButton> : null))}

				<BosslistButton className="bg-success text-center mt-1" onClick={addComponent}>+</BosslistButton>
			</Col>
			<Col>

			</Col>
		</Row>
	)
}

export default Collapse;