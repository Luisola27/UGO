import React, { useEffect, useState } from "react";
import { Container, Grid, Header, Segment, Icon } from "semantic-ui-react";
import { useNinos } from "../../helpers/context/NinosContext";
import { Nino } from "../../types/nino";
import {
  getNinos,
  ninosWithoutGift,
  ninosWithoutSponsor,
} from "../../helpers/nino/ninoHook";

const HomePage: React.FC = () => {
  const { ninos, setNinos } = useNinos();
  const [gift, setGift] = useState<Nino[]>([]);
  const [sponsor, setSponsor] = useState<Nino[]>([]);

  useEffect(() => {
    getNinos(setNinos);
  }, [setNinos]);

  useEffect(() => {
    ninosWithoutGift(setGift);
    ninosWithoutSponsor(setSponsor);
  }, []);
  

  const ninosTotal = ninos.length;
  const giftMissing = gift.length;
  const sponsorMissing = sponsor.length;

  return (
    <Container style={{ marginTop: "2em" }}>
      <Header as="h1" textAlign="center">
        Una Gota en el Oceano
      </Header>
      <Grid columns={3} stackable>
        <Grid.Row>
          <Grid.Column>
            <Segment
              style={{
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "10px",
              }}
            >
              <Icon
                name="gift"
                size="big"
                color="blue"
                style={{ marginBottom: "1em" }}
              />
              <Header as="h1" style={{ marginBottom: "0.5em" }}>
                {giftMissing}
              </Header>
              <p style={{ fontSize: "1.1em" }}>Regalos Faltantes</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment
              style={{
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "10px",
              }}
            >
              <Icon
                name="child"
                size="big"
                color="yellow"
                style={{ marginBottom: "1em" }}
              />
              <Header as="h1" style={{ marginBottom: "0.5em" }}>
                {ninosTotal}
              </Header>
              <p style={{ fontSize: "1.1em" }}>Total de Niños</p>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment
              style={{
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "10px",
              }}
            >
              <Icon
                name="users"
                size="big"
                color="teal"
                style={{ marginBottom: "1em" }}
              />
              <Header as="h1" style={{ marginBottom: "0.5em" }}>
                {sponsorMissing}
              </Header>
              <p style={{ fontSize: "1.1em" }}>Niños sin Padrino</p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default HomePage;
