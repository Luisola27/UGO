import React, { useState } from "react";
import {
  Grid,
  Modal,
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Icon,
} from "semantic-ui-react";
import { deleteNino, getNinos } from "../../../helpers/nino/ninoHook";
import { useNinos } from "../../../helpers/context/NinosContext";

interface Props {
  ninoId: number;
  nameNino: string;
}

export default function DeleteNino({ ninoId, nameNino }: Props) {
  const { setNinos } = useNinos();
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    await deleteNino(ninoId, nameNino);
    setOpen(false);
    getNinos(setNinos);
  };

  return (
    <Grid>
      <Grid.Column>
        <Modal
          size="tiny"
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          open={open}
          trigger={
            <Button icon floated="right" style={{ backgroundColor: 'transparent' }}>
              <Icon color="red" name="trash alternate" />
            </Button>
          }
        >
          <ModalHeader>Eliminar Niño</ModalHeader>
          <ModalContent>
            <p>Esta seguro/a que desea borrar a {nameNino}</p>
          </ModalContent>
          <ModalActions>
            <Button negative onClick={() => setOpen(false)}>
              No
            </Button>
            <Button positive type="submit" onClick={() => handleSubmit()}>
              Yes
            </Button>
          </ModalActions>
        </Modal>
      </Grid.Column>
    </Grid>
  );
}
