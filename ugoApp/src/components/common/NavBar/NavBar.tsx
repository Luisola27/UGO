import { Button, Container, Menu } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to='/' header>
          <img src="public\assets\logo.svg" style={{marginRight: "10px"}} />
          Una Gota
        </Menu.Item>
        <Menu.Item>
          <Button as={NavLink} to='/add' positive>Agregar niño</Button>
        </Menu.Item>
        <Menu.Item as={NavLink} to='/list' name="Lista de Niños"/>
      </Container>
    </Menu>
  );
}
