import React from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CharCard(props) {
	return (
    <Card>
      <Card.Header as="h5">{props.children.charname}</Card.Header>
      <Card.Body>
        <Card.Title>{props.children.classname}</Card.Title>
        <Card.Text>
          {props.children.guildname}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
	)
}

export default CharCard;