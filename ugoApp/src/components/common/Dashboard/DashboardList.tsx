import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Grid,
  Icon,
  Item,
  Label,
  Segment,
} from "semantic-ui-react";
import "../../../styles.css";
import ModalAddSponsor from "../Modal/ModalAddSponsor";
import { useNinos } from "../../../helpers/context/NinosContext";
import { getNinos } from "../../../helpers/nino/ninoHook";
import { CancelNinoRequest } from "../../../services/ninoService";
import { Nino } from "../../../types/nino";
import { useNavigate } from "react-router-dom";
import DeleteNino from "../Delete/DeleteNino";
import CustomSearch from "../CustomSearch/CustomSearch";

const filterOptions = [
  { key: "withSponsor", text: "Con Padrino", value: "withSponsor" },
  { key: "withGift", text: "Con Regalo", value: "withGift" },
  { key: "withoutSponsor", text: "Sin Padrino", value: "withoutSponsor" },
  { key: "withoutGift", text: "Sin Regalo", value: "withoutGift" },
];

export default function DashboardList() {
  const { ninos, setNinos } = useNinos();
  const [selectedNino, setSelectedNino] = useState<Nino | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNinos(setNinos);
    return (): void => {
      CancelNinoRequest("GetNinos");
    };
  }, [setNinos]);

  const handleUpdate = (nino: Nino) => {
    setSelectedNino(nino);
    navigate("/update", { state: { nino: nino } });
  };

  const handleSearchChange = (event: any, data: any) => {
    setSearchValue(data.value);
  };

  const handleFilterChange = (event: any, data: any) => {
    setFilters(data.value);
  };

  const applyFilters = (nino: Nino) => {

    const matchesSearch = (searchValue === "" || searchValue) && nino.name.toLowerCase().includes((searchValue || "").toLowerCase());

    if (filters.length === 0){
      return matchesSearch
    } else {
      const matchesFilters = filters.every((filter) => {
        if (filter === "withSponsor") {
          return nino.sponsor !== null;
        } else if (filter === "withoutSponsor") {
          return nino.sponsor === null;
        } else if (filter === "withGift") {
          return nino.gift !== 0;
        } else if (filter === "withoutGift") {
          return nino.gift === 0;
        } else {
          return true;
        }
      });
      return matchesFilters && matchesSearch;
    }
  };

  const filteredNinos = ninos.filter(
    (nino) =>
      applyFilters(nino) &&
      nino.name
        .toLowerCase()
        .includes(
          (typeof searchValue === "string" ? searchValue : "").toLowerCase()
        )
  );

  return (
    <Grid>
      <Grid.Column width="12">
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
                        <Icon name="gift" size="large" color="pink" />
                      ) : (
                        <div></div>
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
                      <Label content={nino.sponsor} />
                    )}
                  </Item.Extra>
                </Item.Content>
              </Item>
            ))}
          </Item.Group>
        </Segment>
      </Grid.Column>
      <Grid.Column width="4">
        <Segment>
          <CustomSearch
            placeholder="Buscar nombre niño..."
            onSearchChange={handleSearchChange}
            value={searchValue}
          ></CustomSearch>
        </Segment>
        <Dropdown
          placeholder="Filtrar"
          fluid
          multiple
          selection
          options={filterOptions}
          onChange={handleFilterChange}
          value={filters}
        />
      </Grid.Column>
    </Grid>
  );
}
