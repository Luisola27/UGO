import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, Segment, Select } from "semantic-ui-react";
import { Nino } from "../../../types/nino";
import { saveNino } from "../../../helpers/nino/ninoHook";
import { useNavigate } from "react-router-dom";
import { useNinos } from "../../../helpers/context/NinosContext";

const InitialFormData: Nino = {
  ninoId: 0,
  name: "",
  identification: "",
  age: 0,
  gender: 0,
  sponsor: "",
  gift: 0
};

export default function NinoForm() {
  const { ninos, setNinos } = useNinos();
  const [formData, setFormData] = useState<Nino>(InitialFormData);
  const navigate = useNavigate();

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveNino(
      `"${formData.name}"`,
      `"${formData.identification}"`,
      formData.age,
      formData.gender
    );
    setNinos((prevNinos) => [...prevNinos, formData]);
    setFormData(InitialFormData);
    navigate("/list");
    setNinos(ninos)
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
          <Button
            content="Ingresar"
            labelPosition="left"
            icon="checkmark"
            positive
            type="submit"
          ></Button>
        </Form>
    </Segment>
  );
}
