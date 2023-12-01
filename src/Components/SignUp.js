import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { loginStyle } from "../Styles/login";
import { inputFieldStyled } from "../Styles/Input";
import ErrorMessage from "./ErrorMessage";
import { Navigate, useNavigate } from "react-router";
import { alertUtils } from "../utils/alertUtils";
import { useDispatch } from "react-redux";
import { signup } from "../Redux/Auth/authActionCreator";
import Loader from "./loader";
const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoader,setLoader] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handler = (response) => {
    setLoader(false)
    if (response.status === 201) {
      
      alertUtils
        .successAlert("Success", "", "success", false)
        .then((alertResponse) => {
          navigate("/addSkills");
        })
        .catch(() => {});

    }
    if (response.status === 400) {
      alertUtils
        .successAlert("", response.data.errors[0].message, "error", false)
        .then((alertResponse) => {})
        .catch(() => {});
    }
  }
  
  const onSubmit = (data) => {
    setLoader(true);
    dispatch(signup(data, handler));
    setSignUpData({
      name: "",
      email: "",
      password: "",
    });
  };
  return (
    <>{isLoader ?
      // <Box
      //   sx={{
      //     display: "flex",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     marginTop: "80px",
      //   }}
      // >
      //   <CircularProgress color="secondary" size="20vh" />
      // </Box>
      <Loader isOpen={isLoader}/> :
      <Stack direction="column" marginLeft="70px">
        <Typography variant="h3" sx={loginStyle.loginHeading}>
          Sign up Page
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Typography sx={loginStyle.inputHeading}>Entername</Typography>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="name"
                  variant="outlined"
                  type="text"
                  sx={inputFieldStyled.input}
                  value={signupData.name}
                  {...register("name", {
                    required: true,
                  })}
                  onChange={(e) =>
                    setSignUpData({ ...signupData, name: e.target.value })
                  }
                />
              )}
            />
            {errors.name && signupData.name === "" && (
              <ErrorMessage text="name" type="" />
            )}
          </Stack>
          <Divider sx={{ border: "none", height: "5px" }} />
          <Stack spacing={2}>
            <Typography sx={loginStyle.inputHeading}>Email</Typography>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="name"
                  variant="outlined"
                  type="text"
                  sx={inputFieldStyled.input}
                  value={signupData.email}
                  {...register("email", {
                    required: true,
                  })}
                  onChange={(e) =>
                    setSignUpData({ ...signupData, email: e.target.value })
                  }
                />
              )}
            />
            {errors.email && signupData.email === "" && (
              <ErrorMessage text="email" type="" />
            )}
          </Stack>
          <Divider sx={{ border: "none", height: "5px" }} />
          <Stack spacing={2}>
            <Typography sx={loginStyle.inputHeading}>Password</Typography>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Pasword"
                  variant="outlined"
                  type="password"
                  value={signupData.password}
                  {...register("password", {
                    required: true,
                  })}
                  sx={inputFieldStyled.input}
                  onChange={(e) =>
                    setSignUpData({ ...signupData, password: e.target.value })
                  }
                />
              )}
            />
            {errors.password && signupData.password === "" && (
              <ErrorMessage text="password" type="" />
            )}
          </Stack>
          <Divider sx={{ border: "none", height: "7px" }} />
          <Button type="submit" sx={{ width: "308px" }} variant="contained">
            Login
          </Button>
        </form>
      </Stack>
      }
    </>
  );
};
export default SignUp;
