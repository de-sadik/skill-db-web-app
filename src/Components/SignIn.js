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
import { useNavigate } from "react-router-dom";
import { apiService } from "../service/apiService";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../Redux/Auth/authActionCreator";
import { alertUtils } from "../utils/alertUtils";
import Loader from "./loader";

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoader,setLoader] = useState(false)
  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });
  const handler = (response) => {
    setLoader(false)
    if (response.status === 200) {
      navigate("/addSkills");
    }
    if (response.status === 400) {
      alertUtils
        .successAlert("", response.data.errors[0].message, "error", false)
        .then((alertResponse) => {})
        .catch(() => {});
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    setLoader(true);
    dispatch(signin(logData, handler));
    setLogData({ email: "", password: "" });
  };
  return (
    <> { isLoader? 
      
      <Loader isOpen={isLoader}/>:
      <Stack direction="column" marginLeft="70px">
        <Typography variant="h3" sx={loginStyle.loginHeading}>
          Sign In Page
        </Typography>
        <Divider sx={{ border: "none", height: "20px" }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Typography sx={loginStyle.inputHeading}>Username</Typography>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="User Name"
                  variant="outlined"
                  type="text"
                  sx={inputFieldStyled.input}
                  value={logData.email}
                  {...register("email", {
                    required: true,
                  })}
                  onChange={(e) =>
                    setLogData({ ...logData, email: e.target.value })
                  }
                />
              )}
            />
            {errors.email && logData.email === "" && (
              <ErrorMessage text="email" type="" />
            )}
          </Stack>

          <Divider sx={{ border: "none", height: "20px" }} />
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
                  value={logData.password}
                  {...register("password", {
                    required: true,
                  })}
                  sx={inputFieldStyled.input}
                  onChange={(e) =>
                    setLogData({ ...logData, password: e.target.value })
                  }
                />
              )}
            />
          </Stack>
          {errors.password?.type === "required" && logData.password === "" && (
            <ErrorMessage text="password" type="" />
          )}
          {errors.password?.type === "required" && (
            <ErrorMessage type="incorrect" text="password" check={false} />
          )}
          <Divider sx={{ border: "none", height: "25px" }} />
          <Button sx={{ width: "308px" }} variant="contained" type="submit">
            Login
          </Button>
        </form>
      </Stack>}
    </>
  );
};
export default SignIn;
