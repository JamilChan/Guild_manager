import React, {useState, useEffect} from 'react'
import Axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Collapse from '../Collapse'

function Raid() {
	const [raidTiers, setRaidTiers] = useState([])
	const [interval, setiinterval] = useState(0)

	useEffect(() => {
    Axios.get('http://localhost:3001/api/raidtiers/get').then((response) => {
      setRaidTiers(response.data)
			setiinterval(response.data[response.data.length - 1].id + 1);
		});
  }, []);


  function addComponent() {
    setRaidTiers([...raidTiers, {id: interval, name: ''}])
		setiinterval(interval+1)
  }

	return (
		<Container>
			<Accordion>
      {raidTiers.map((item, i) => ( <Collapse key={i}>{item}</Collapse> )) }
			</Accordion>
			<Button className="w-100" variant="success" onClick={addComponent} text="Call Component">+</Button>

		</Container>
	)
}

export default Raid