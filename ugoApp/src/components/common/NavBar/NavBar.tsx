import { Button, Container, Menu } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { NavLink } from "react-router-dom";
import Auth0AuthenticationButtons from "../Auth0/auth0Button";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Menu.Item as={NavLink} to='/' header>
          <img src="assets\logo.png" style={{marginRight: "10px"}} />
          Una Gota
        </Menu.Item>
        <Menu.Item>
          <Button as={NavLink} to='/add' positive>Agregar niño</Button>
        </Menu.Item>
        <Menu.Item as={NavLink} to='/list' name="Lista de Niños"/>
        <Menu.Menu position="right">
        <Auth0AuthenticationButtons />
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
