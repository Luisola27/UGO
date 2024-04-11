import React, { useEffect } from "react";
import { Item, Label, Segment } from "semantic-ui-react";
import ModalAddSponsor from "../Modal/ModalAddSponsor";
import { useNinos } from "../../../helpers/context/NinosContext";

export default function NinoList() {
  const { ninos, setNinos } = useNinos();;
 
  // useEffect(() => {
  //   getNinos(setNinos);
  // }, [ninos]);

  return (
    <Segment>
      <Item.Group color="blue" divided>
        {ninos.map((nino) => (
          <Item  key={nino.ninoId}>
            <Item.Content>
              <Item.Header as="a">{`Nombre: ${nino.name}`}</Item.Header>
              <Item.Meta>{`Cédula: ${nino.identification}`}</Item.Meta>
              <Item.Description>
                <div>{`Años: ${nino.age}`}</div>
                <div>{nino.gender == 0 ? "Niño" : "Niña"}</div>
              </Item.Description>
              <Item.Extra>
                {nino.sponsor === null  ?
                <ModalAddSponsor nino={nino} />
                :
                <Label basic content={nino.sponsor} />
                }
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
