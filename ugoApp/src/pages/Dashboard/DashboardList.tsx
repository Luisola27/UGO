/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Icon,
  Item,
  Label,
  Search,
  Segment,
} from "semantic-ui-react";
import "../../styles.css";
import ModalAddSponsor from "../../components/common/Modal/ModalAddSponsor";
import { useNinos } from "../../helpers/context/NinosContext";
import { getNinos } from "../../helpers/nino/ninoHook";
import { CancelNinoRequest } from "../../services/ninoService";
import { Nino } from "../../types/nino";
import { useNavigate } from "react-router-dom";
import DeleteNino from "../Delete/DeleteNino";

export default function DashboardList() {
  const { ninos, setNinos } = useNinos();
  const [selectedNino, setSelectedNino] = useState<Nino | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getNinos(setNinos);
    return (): void => {
      CancelNinoRequest("GetNinos");
    };
  }, [setNinos]);

  const handleUpdate = (nino: Nino) => {
    setSelectedNino(nino);
    console.log(selectedNino);

    navigate("/update", { state: { nino: nino } });
  };

  const handleSearchChange = (event: any, data: any) => {
    setSearchValue(data.value);
    console.log(event);
  };

  const filteredNinos = ninos.filter((nino) =>
    nino.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Grid>
      <Grid.Column width="13">
        <Segment>
          <Item.Group color="blue" divided>
            {filteredNinos.map((nino) => (
              <Item key={nino.ninoId}>
                <Item.Content>
                  <Item.Header as="a">{`${nino.name}`}</Item.Header>
                  <Item.Description>
                    <div>{`Años: ${nino.age}`}</div>
                    <div>{nino.gender == 0 ? "Niño" : "Niña"}</div>
                    <div>
                      {nino.gift ? (
                        <Icon name="gift" size="big" color="pink" />
                      ) : (
                        <></>
                      )}
                    </div>
                  </Item.Description>
                  <Item.Extra>
                    <div style={{ position: "absolute", top: -100, right: 0 }}>
                      <DeleteNino ninoId={nino.ninoId} nameNino={nino.name} />
                    </div>
                    <Button
                      color="orange"
                      floated="right"
                      onClick={() => handleUpdate(nino)}
                    >
                      Actualizar
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
      <Grid.Column width="3">
        <Search
          placeholder="Buscar nombre niño..."
          onSearchChange={handleSearchChange}
          value={searchValue}
        ></Search>
      </Grid.Column>
    </Grid>
  );
}
