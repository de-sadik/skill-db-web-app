import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import AppleIcon from "@mui/icons-material/Apple";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const NavigateToPage = (path) => navigate(path);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Grid
              justify="space-between" // Add it here :)
              container
              alignItems="center"
              spacing={24}
            >
              <Grid item xs={7}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <AppleIcon
                    sx={{
                      fontSize: 40,
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid item xs={5}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ cursor: "pointer" }}
                    onClick={() => NavigateToPage("/addSkills")}
                  >
                    AddSkills
                  </Typography>
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ cursor: "pointer" }}
                    onClick={() => NavigateToPage("/userSkills")}
                  >
                    UserSkills
                  </Typography>
                  <Typography
                    variant="h6"
                    color="inherit"
                    component="div"
                    sx={{ cursor: "pointer" }}
                    onClick={() => NavigateToPage("/query")}
                  >
                    Query
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
