import React from 'react'
import {BosslistButton} from '../styles/Bosslist.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'


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
			<FontAwesomeIcon className='btn btn-danger ms-2 rounded-0' icon={faX} onClick={(e) => {
				e.stopPropagation();

				props.deleteClick(props.children.id)
			}}/>
		</BosslistButton>
	)
}

export default BossButton;