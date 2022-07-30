import React from 'react'
import {BosslistButton} from '../styles/Bosslist.style';


function BossButton(props) {
	return (
		<BosslistButton image={`/${props.children.name.split(" ").join("")}.png`} className="bg-dark" onClick={() => {props.btnClick(props.children.id)}}>
			<input
				type="text"
				className='text-end'
				defaultValue={props.children.name}
				onChange={(e) => {
					props.inputChange({id: props.children.id, name: e.target.value});
				}}
			/>
		</BosslistButton>
	)
}

export default BossButton;