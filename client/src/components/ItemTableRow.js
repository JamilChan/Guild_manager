import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

function ItemTableRow(props) {
	return (
		<tr>
			<td>
				<input type="text" defaultValue={props.children.name} onChange={(e) => {props.func({id: props.children.id, name: e.target.value})}}/>
			</td>
			<td>
				<input type="text" defaultValue={props.children.type}  onChange={(e) => {props.func({id: props.children.id, type: e.target.value})}}/>
			</td>
			<td>
				<input type="text" defaultValue={props.children.stat}  onChange={(e) => {props.func({id: props.children.id, stat: e.target.value})}}/>
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