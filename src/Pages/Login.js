import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import { loginStyle } from "../Styles/login";
import login from "../assets/login.png";
import InputFields from "../Components/InputFields";
import { inputFieldStyled } from "../Styles/Input";

import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";
const Login = () => {
  const [value, setValue] = React.useState("in");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Paper sx={loginStyle.root}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Box sx={loginStyle.leftView}>
            <img
              src={login}
              alt="login"
              style={{ height: "70%", width: "80%", marginTop: "150px" }}
            />
          </Box>

          <Box sx={loginStyle.rightView}>
            <Box sx={{ width: "100%", marginLeft: "60%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab value="in" label="sign In" />

                <Tab value="up" label="sign Up" />
              </Tabs>
            </Box>
            <Divider sx={{ border: "none", height: "5px" }} />
            {value === "in" && <SignIn />}

            {value === "up" && <SignUp />}
          </Box>
        </Stack>
      </Paper>
    </>
  );
};

export default Login;
