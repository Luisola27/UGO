import React, { useEffect } from "react";
import { Container, Header, Segment, Statistic } from "semantic-ui-react";
import { getNinos } from "../../../helpers/nino/ninoHook";
import { useNinos } from "../../../helpers/context/NinosContext";

export default function HomePage() {
  const { ninos, setNinos } = useNinos();

  useEffect(() => {
    getNinos(setNinos);
  });

  const totalNinosCount = ninos.length;

  const countSponsor = ninos.reduce(
    (accumulator, currentNino) =>
      currentNino.sponsor ? accumulator + 1 : accumulator,
    0
  );

  const countGift = ninos.reduce(
    (accumulator, currentNino) =>
      currentNino.gift ? accumulator + 1 : accumulator,
    0
  );

  const countWithoutGift = totalNinosCount - countGift;

  const countWithoutSponsor = totalNinosCount - countSponsor;

  return (
    <Container style={{ marginTop: "7em" }}>
      <Segment textAlign="center">
        <Header as="h1" color="blue">
          Estadísticas de Niños
        </Header>
        <Statistic.Group widths="three">
          <Statistic>
            <Statistic.Value>{countGift}</Statistic.Value>
            <Statistic.Label>
              Niños
              <br />
              con Regalo
            </Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{countSponsor}</Statistic.Value>
            <Statistic.Label>
              Niños <br />
              con Padrino
            </Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{totalNinosCount}</Statistic.Value>
            <Statistic.Label>
              Total <br /> de Niños
            </Statistic.Label>
          </Statistic>
          <Statistic color="red">
            <Statistic.Value>{countWithoutGift}</Statistic.Value>
            <Statistic.Label>
              Niños <br />
              sin regalo
            </Statistic.Label>
          </Statistic>
          <Statistic color="red">
            <Statistic.Value>{countWithoutSponsor}</Statistic.Value>
            <Statistic.Label>
              Niños <br />
              sin padrino
            </Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Segment>
    </Container>
  );
}
