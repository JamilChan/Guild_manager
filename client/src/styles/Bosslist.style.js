import styled from "styled-components";
import Button from 'react-bootstrap/Button';

export const BosslistButton = styled(Button)`
  background: url(${(props) => props.image}) center;
  min-width: 250px;
  padding: 2ch;
  border-radius: 0;
`;
