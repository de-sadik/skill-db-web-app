import React from "react";
import TextField from "@mui/material/TextField";
import { inputFieldStyled } from "../Styles/Input";
const InputFields = ({ type, label }) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        type={type}
        sx={inputFieldStyled.input}
      />
    </>
  );
};

export default InputFields;
