import React from 'react'


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
		</tr>
	)
}

export default ItemTableRow;