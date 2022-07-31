import React, {useState, useEffect} from 'react'
import Axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Collapse from '../RaidtierbossCollapse'

function Raid() {
	const [raidtiers, setRaidtiers] = useState([])
	const [rerenderstate, setRerenderstate] = useState(false)

	useEffect(() => {
    Axios.get('http://localhost:3001/api/raidtiers/get').then((response) => {
      setRaidtiers(nestRaidtier(response))
		});
  }, []);

	function nestRaidtier(response) {
		let nest = []

		response.data.map((item, i) => {
			if(!nest[item.raidid]) {
				nest[item.raidid] = {id: item.raidid, name: item.raidname, bosses: []}
			}

			if(!nest[item.raidid]['bosses'][item.bossid] && item.bossid != null) {
				nest[item.raidid]['bosses'][item.bossid] = {id: item.bossid, name: item.bossname, items: []}
			}

			if(item.itemid) {nest[item.raidid]['bosses'][item.bossid]['items'][item.itemid] = {id: item.itemid, name: item.itemname, type: item.itemtype, stat: item.itemstat}}

			return null;
		})

		return nest;
	}

  function addComponent() {
    setRaidtiers([...raidtiers, {id: raidtiers.length, name: '', bosses: [], new: true}])
  }

	const handleDeleteRaidtier = (id) => {
		let tempstate = raidtiers;

		delete tempstate[id]

		setRaidtiers(tempstate)
		setRerenderstate(!rerenderstate)
	}

	return (
		<Container>
			<Accordion>
      {raidtiers.map((item, i) => (item != null ? <Collapse key={i} handleDelete={handleDeleteRaidtier}>{item}</Collapse> : null)) }
			</Accordion>
			<Button className="w-100" variant="success" onClick={addComponent}>+</Button>

		</Container>
	)
}

export default Raid;