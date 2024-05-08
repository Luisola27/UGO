import React, { useState } from "react";
import { Input, Segment, Icon } from "semantic-ui-react";


interface CustomSearchProps {
    placeholder: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>, data: any) => void;
    value: string;
  }

export default function CustomSearch( {placeholder, onSearchChange, value}: CustomSearchProps ) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  return (
    <Segment basic>
      <Input
        icon
        fluid
        placeholder={placeholder}
        onChange={onSearchChange}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <input />
        <Icon
          name={focused ? "search" : "search"}
          color={focused ? "teal" : "grey"}
          style={{ cursor: "pointer" }}
        />
      </Input>
    </Segment>
  );
}
