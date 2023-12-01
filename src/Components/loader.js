import { CircularProgress, Modal } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Loader = ({isOpen}) => {
  return (
    <Modal
          open={isOpen}
          aria-labelledby="loader-popup"
          aria-describedby="loader"
        >
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "80px",
      }}
    >
      <CircularProgress color="secondary" size="20vh" />
    </Box>
    </Modal>
  );
};
export default Loader
