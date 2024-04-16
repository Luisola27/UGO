import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Checkbox, Form, Segment, Select } from "semantic-ui-react";
import { Nino } from "../../../types/nino";
import { getNinos, saveNino, updateNino } from "../../../helpers/nino/ninoHook";
import { useLocation, useNavigate } from "react-router-dom";
import { useNinos } from "../../../helpers/context/NinosContext";

const InitialFormData: Nino = {
  ninoId: 0,
  name: "",
  identification: "",
  age: 0,
  gender: 0,
  sponsor: "",
  gift: 0,
};

export default function DashboardAdd() {
  const { setNinos } = useNinos();
  const [formData, setFormData] = useState<Nino>(InitialFormData);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedNino = location.state?.nino || null;

  useEffect(() => {
    if (selectedNino) {
      setFormData(selectedNino);
    }else{
      setFormData(InitialFormData)
    }
  }, [selectedNino]);

  const genderOptions = [
    { key: "male", text: "Male", value: 0 },
    { key: "female", text: "Female", value: 1 },
  ];

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    data: any
  ) => {
    const { name, value } = data;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedNino === undefined || selectedNino === null) {
      await saveNino(
        `"${formData.name}"`,
        `"${formData.identification}"`,
        formData.age,
        formData.gender,
        formData.sponsor ? `"${formData.sponsor}"` : formData.sponsor,
        formData.gift ? formData.gift : 0
      );
    } else {
      await updateNino(
        formData.ninoId,
        `"${formData.name}"`,
        `"${formData.identification}"`,
        formData.age,
        formData.gender,
        formData.sponsor ? `"${formData.sponsor}"` : formData.sponsor,
        formData.gift ? formData.gift : 0
      );
    }
    setFormData(InitialFormData);
    await getNinos(setNinos);
    navigate("/list");
  };

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="Name"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Form.Input
          label="Cédula"
          placeholder="Cédula"
          name="identification"
          value={formData.identification}
          onChange={handleChange}
        />
        <Form.Input
          label="Años"
          placeholder="Años"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <Form.Field
          control={Select}
          options={genderOptions}
          label="Gender"
          placeholder="Gender"
          search
          searchInput={{ id: "form-select-control-gender" }}
          name="gender"
          onChange={handleChange}
          value={formData.gender}
        />
        <Form.Input
          label="Padrino"
          placeholder="Padrino"
          name="sponsor"
          value={formData.sponsor}
          onChange={handleChange}
        />
        <Form.Field>
          <label>Gift</label>
          <Checkbox
            toggle
            value={formData.gift}
            checked={formData.gift === 1}
            onChange={() =>
              setFormData((prevState) => ({
                ...prevState,
                gift: formData.gift === 0 ? 1 : 0,
              }))
            }
          />
        </Form.Field>
        <Button
          content={selectedNino ? "Actualizar" : "Ingresar"}
          labelPosition="left"
          icon="checkmark"
          positive
          type="submit"
        ></Button>
      </Form>
    </Segment>
  );
}
