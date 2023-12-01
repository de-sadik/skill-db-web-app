import Login from "./Pages/Login";
import { Paper, Box, Typography, Stack } from "@mui/material";
import Navbar from "./Components/Navbar";
import Routing from "./Routes/Routing";
function App() {
  return (
    <Stack direction="column" spacing={2}>
      {/* <Navbar /> */}
      <Routing />
      {/* <Login /> */}
    </Stack>
  );
}

export default App;
