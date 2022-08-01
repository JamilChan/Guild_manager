import React from 'react'
import BootstrapSelect from 'react-bootstrap-select-dropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

function ItemTableRow(props) {
	let options = JSON.parse(JSON.stringify(props.itemtypes))

	Object.keys(options).forEach(key => {
		if(options[key].labelKey === props.children.type) {options[key].isSelected = true;}
	});

	const handleChange = (selectedOptions) => {
		props.func({id: props.children.id, type: selectedOptions.selectedKey[0]})
	}

	return (
		<tr>
			<td>
				<input type="text" defaultValue={props.children.name} onChange={(e) => {props.func({id: props.children.id, name: e.target.value})}}/>
			</td>
			<td>
				<BootstrapSelect options={options} showSearch={true} menuSize={10} onChange={handleChange} />
			</td>
			<td>
				<FontAwesomeIcon className='btn btn-danger ms-2 rounded-0' icon={faX} onClick={(e) => {
					e.stopPropagation();

					props.deleteClick(props.children.id)
				}}/>
			</td>
		</tr>
	)
}

export default ItemTableRow;