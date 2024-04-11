import React, { FormEvent, useState } from "react";
import {
  Modal,
  Button,
  ModalHeader,
  ModalContent,
  ModalDescription,
  ModalActions,
  Form,
} from "semantic-ui-react";
import { Nino } from "../../../types/nino";
import { updateSponsor } from "../../../helpers/nino/ninoHook";

interface Props {
    nino:Nino;
}

export default function ModalAddSponsor({ nino }:Props) {
  const [open, setOpen] = useState(false);
  const [sponsor, setSponsor] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSponsor(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpen(false);
    updateSponsor(nino.ninoId, sponsor).then(() => {
    });
    setSponsor("");
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button floated="right" primary>
          Agregar Padrino
        </Button>
      }
    >
      <ModalHeader>Agregar Padrino</ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Padrino"
              placeholder="Nombre del padrino"
              value={sponsor}
              onChange={handleChange}
            />
            <ModalActions>
                <div style={{ textAlign: "right", marginTop: "10px" }}>
              <Button color="red" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button
                content="Agregar Padrino"
                labelPosition="right"
                icon="checkmark"
                color="violet"
                type="submit"
              />
              </div>
            </ModalActions>
          </Form>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
}
