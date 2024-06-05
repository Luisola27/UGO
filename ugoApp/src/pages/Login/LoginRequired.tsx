import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Header, Segment, Button } from "semantic-ui-react";

const LoginRequiredPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container text textAlign="center" style={{ marginTop: "5em" }}>
      <Segment placeholder>
        <Header as="h2">Contenido Protegido</Header>
        <p>Debes iniciar sesión para ver esta página.</p>
        <Button primary onClick={() => loginWithRedirect()}>
          Iniciar sesión
        </Button>
      </Segment>
    </Container>
  );
};

export default LoginRequiredPage;
