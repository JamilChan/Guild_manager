import React, {useState} from 'react'


function ItemTableRow(props) {
	const children = props.children;
	// const [bossname, setBossname] = useState(children.name)

	return (
		<tr>
			<td>
				<input type="text" defaultValue={children.name} />
			</td>
			<td>
				<input type="text" defaultValue={children.type} />
			</td>
			<td>
				<input type="text" defaultValue={children.stat} />
			</td>
	</tr>
	)
}

export default ItemTableRow;