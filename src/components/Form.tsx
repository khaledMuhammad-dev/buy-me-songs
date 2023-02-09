import React from "react";
import { Stack } from "@mui/material";
import { Input } from "./Input";
import { CurrentStepProps } from "./Wizard";

export const Form:React.FC<CurrentStepProps> = (props) => {
  const { handleChange, handleUserState, errors, fields } = props;

  return (
    <Stack spacing={3}>
      <Input
        error={errors.name ? true : false}
        helperText={errors.name && errors.name}
        label="name"
        InputProps={{
          onChange: handleChange,
          value: fields.name,
          onBlur: handleUserState,
          name: "name",
        }}
      />
      
      <Input
        error={errors.mobile ? true : false}
        helperText={errors.mobile && errors.mobile}
        label="mobile"
        InputProps={{
          onChange: handleChange,
          value: fields.mobile,
          onBlur: handleUserState,
          name: "mobile",
        }}
      />
      
      <Input
        error={errors.email ? true : false}
        helperText={errors.email && errors.email}
        label="email"
        InputProps={{
          onChange: handleChange,
          value: fields.email,
          onBlur: handleUserState,
          name: "email",
        }}
      />
    </Stack>
  );
};
