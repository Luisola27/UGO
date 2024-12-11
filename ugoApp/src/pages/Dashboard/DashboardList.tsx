/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Icon,
  Item,
  Label,
  Pagination,
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
import DashboardAdd from "./DashboardAdd";

export default function DashboardList() {
  const { ninos, setNinos } = useNinos();
  const [selectedNino, setSelectedNino] = useState<Nino | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [displayedNinos, setDisplayedNinos] = useState<Nino[]>([]);
  const itemsPerPage = 7;
  const navigate = useNavigate();

  useEffect(() => {
    getNinos(setNinos);
    return (): void => {
      CancelNinoRequest("GetNinos");
    };
  }, [setNinos]);

  useEffect(() => {
    const filtered = ninos.filter((nino) =>
      nino.name.toLowerCase().includes(searchValue.toLowerCase())
    ).sort((a, b) => b.ninoId - a.ninoId);
    const begin = (activePage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    setDisplayedNinos(filtered.slice(begin, end));
  }, [ninos, searchValue, activePage]);

  const handleUpdate = (nino: Nino) => {
    setSelectedNino(nino);
    console.log(selectedNino);

    navigate("/update", { state: { nino: nino } });
  };

  const handleSearchChange = (event: any, data: any) => {
    setSearchValue(data.value);
    setActivePage(1);
  };

  const handlePageChange = (event: any, { activePage }: any) => {
    setActivePage(activePage);
  };

  // const filteredNinos = ninos.filter((nino) =>
  //   nino.name.toLowerCase().includes(searchValue.toLowerCase())
  // );

  return (
    <Grid>
  <Grid.Row>
    <Grid.Column width="10">
      <Segment>
        <Item.Group color="blue" divided>
          {displayedNinos.map((nino) => (
            <Item key={nino.ninoId}>
              <Item.Content>
                <Item.Header as="a">{`${nino.name}`}</Item.Header>
                <Item.Description>
                  <div>{`Años: ${nino.age}`}</div>
                  <div>{nino.gender == 0 ? "Niño" : "Niña"}</div>
                  <div>
                    {nino.gift ? (
                      <Icon name="gift" size="big" color="pink" />
                    ) : null}
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
        <Pagination
        activePage={activePage}
        totalPages={Math.ceil(
          ninos.filter((nino) =>
          nino.name.toLowerCase().includes(searchValue.toLowerCase()))
          .length / itemsPerPage
        )}
        onPageChange={handlePageChange} />
      </Segment>
    </Grid.Column>

    <Grid.Column width="6">
      <Search
        placeholder="Buscar nombre niño..."
        onSearchChange={handleSearchChange}
        value={searchValue}
      />
      <div style={{ marginTop: "1rem" }}>
        <DashboardAdd />
      </div>
    </Grid.Column>
  </Grid.Row>
</Grid>

  );
}
