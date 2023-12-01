import * as React from "react";
import { Typography, Stack } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { textAlign } from "@mui/system";
const ErrorMessage = ({ text, type, check }) => {
  return (
    <div>
      {type === "" && (
        <Stack direction="row" alignItems="center">
          <ErrorIcon sx={{ color: "red", marginRight: "5px" }} />
          <Typography variant="h6" sx={{ color: "red" }}>
            {text} is required!
          </Typography>
        </Stack>
      )}
      {type === "incorrect" && check === true && (
        <Typography variant="h6" sx={{ color: "red" }}>
          incorrect password
        </Typography>
      )}
    </div>
  );
};
export default ErrorMessage;
