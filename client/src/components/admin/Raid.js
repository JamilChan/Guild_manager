import React, {useState, useEffect} from 'react'
import Axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Collapse from '../RaidtierbossCollapse'

function Raid() {
	const [raidTiers, setRaidTiers] = useState([])

	useEffect(() => {
    Axios.get('http://localhost:3001/api/raidtiers/get').then((response) => {
      setRaidTiers(nestRaidtier(response))
		});
  }, []);

	function nestRaidtier(response) {
		let nest = []

		response.data.map((item, i) => {
			if(!nest[item.raidid]) {
				nest[item.raidid] = {name: item.raidname, bosses: []}
			}

			if(!nest[item.raidid]['bosses'][item.bossid] && item.bossid != null) {
				nest[item.raidid]['bosses'][item.bossid] = {name: item.bossname, items: []}
			}

			if(item.itemid) {nest[item.raidid]['bosses'][item.bossid]['items'][item.itemid] = {name: item.itemname, type: item.itemtype, stat: item.itemstat}}

			return null;
		})

		return nest;
	}

  function addComponent() {
    setRaidTiers([...raidTiers, {name: '', bosses: []}])
  }

	return (
		<Container>
			<Accordion>
      {raidTiers.map((item, i) => (item != null ? <Collapse key={i}>{item}</Collapse> : null)) }
			</Accordion>
			<Button className="w-100" variant="success" onClick={addComponent} text="Call Component">+</Button>

		</Container>
	)
}

export default Raid