import React, { useEffect, useState } from "react";
import { Button, Grid, Item, Label, Segment } from "semantic-ui-react";
import ModalAddSponsor from "../Modal/ModalAddSponsor";
import { useNinos } from "../../../helpers/context/NinosContext";
import { getNinos } from "../../../helpers/nino/ninoHook";
import { CancelNinoRequest } from "../../../services/ninoService";
import { Nino } from "../../../types/nino";
import { useNavigate } from "react-router-dom";
import DeleteNino from "../Delete/DeleteNino";

export default function DashboardList() {
  const { ninos, setNinos } = useNinos();
  const [selectedNino, setSelectedNino] = useState<Nino | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    getNinos(setNinos);
    return (): void => {
      CancelNinoRequest("GetNinos");
    };
  }, [setNinos]);

  const handleUpdate = (nino: Nino) => {
    setSelectedNino(nino);
    navigate('/update', {state: {nino: nino}});
  };

  return (
    <Grid columns={2}>
      <Grid.Column width='13'>
      <Segment>
      <Item.Group color="blue" divided>
        {ninos.map((nino) => (
          <Item key={nino.ninoId}>
            <Item.Content>
              <Item.Header as="a">{`Nombre: ${nino.name}`}</Item.Header>
              <Item.Meta>{`Cédula: ${nino.identification}`}</Item.Meta>
              <Item.Description>
                <div>{`Años: ${nino.age}`}</div>
                <div>{nino.gender == 0 ? "Niño" : "Niña"}</div>
              </Item.Description>
              <Item.Extra>
              <div style={{ position: 'absolute', bottom: 100, right: 20 }}>
                <DeleteNino ninoId={nino.ninoId} nameNino={nino.name}/>
                </ div>
                <Button color="orange" floated="right" onClick={() => handleUpdate(nino)}>
                  Actualizar Niño
                </Button>
                {nino.sponsor === null ? (
                  <ModalAddSponsor nino={nino} />
                ) : (
                  <Label basic content={nino.sponsor} />
                )}
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
      </Grid.Column>
    </Grid>
  );
}
