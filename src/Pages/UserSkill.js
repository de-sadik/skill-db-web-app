import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import {
  Stack,
  Typography,
  Paper,
  Box,
  Divider,
  Button,
  CircularProgress,
  Grid,
  Rating,
  Tooltip,
} from "@mui/material";
import InputFields from "../Components/InputFields";
import { loginStyle } from "../Styles/login";
import { addSkills } from "../Styles/Addskills";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "../Components/FormModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { AlignVerticalCenter } from "@mui/icons-material";
import EditForm from "../Components/EditForm";
import { getSkillExperties } from "../Redux/addUserSkill.js/userExpertiseActionCreator";
import { alertUtils } from "../utils/alertUtils";
import { useNavigate } from "react-router";

function UserSkill() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoader,setLoader] = useState(false)
  const [addMultipleSkill, setAddMultipleSkill] = useState([]);
  const [editUser, setEditUser] = useState({});
  const [hover, setHover] = React.useState(1);
  const navigator = useNavigate()
  
  const labels = {
    1: "Begginer",
    2: "Intermediate",
    3: "Advanced",
  };
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const handleOpen = () =>{
    navigate('/addSkills')
  };
  const handleClose = () => setOpen(false);
  const skillExperties = useSelector((state) => state.addsExpertiesReducer);
  console.log(skillExperties)
  const handleEditSkill = (obj) => {
    setOpen(true);
    setEditUser({ ...obj });
  };
  const handleDeleteSkill = () => {
    alert("clicked the edit ");
  };
  
  const handler = (response) => {
    setLoader(false)
    if (response.status === 401) {
      alertUtils
        .successAlert("", response.data.errors[0].message, "error", false)
        .then((alertResponse) => {
          navigate("/")
        })
        .catch(() => {});
    }
  }
  useEffect(()=>{
    dispatch(getSkillExperties(handler))
  },[])

  return (
    <Stack direction="column" sx={{ backgroundColor: "#F8F9F0" }}>
      <Navbar />
      <Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            "& > :not(style)": {
              m: 4,
              width: 1000,
              height: 600,
            },
          }}
        >
          <Paper elevation={3} sx={{ borderRadius: "16px" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              // spacing={24}
              sx={{ margin: "10px" }}
            >
              <Typography variant="h4" sx={addSkills.skillsHeading}>
                Expertise
              </Typography>
              <Button
                onClick={handleOpen}
                onDoubleClick={handleClose}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add New Expertise
              </Button>
            </Stack>
            <Divider />
            {isLoader && (
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
            )}
            <Box
              sx={{
                height: "520px",
                width: "63vw",

                overflowY: "hidden",

                margin: "20px 0px 30px 30px",
              }}
            >
              <Stack
                direction="row"
                width="950px"
                justifyContent="space-evenly"
                flexWrap="wrap"
                sx={{
                  overflowY: "auto",
                  " ::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
                height="500px"
              >
                {skillExperties.map((item) => {
                  return (
                    <>
                     
                      {item.domaiName === item.domaiName ? (
                        <Paper
                          elevation={3}
                          sx={{
                            height: "230px",
                            marginTop: "20px",
                            width: "280px",
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-end"
                            sx={{ marginTop: "5px" }}
                          >
                            <EditIcon
                              sx={{ cursor: "pointer" }}
                              onClick={() => handleEditSkill(item)}
                            />
                          </Stack>
                          <Box
                            sx={{
                              height: "10vh",
                              width: "10vw",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginLeft: "55px",
                            }}
                          >
                            <Paper
                              sx={{
                                height: 50,
                                width: "auto",
                                margin: "5px",
                                padding: "13px",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "#0288d1",
                                  textAlign: "center",
                                  textTransform: "uppercase",
                                }}
                                variant="h6"
                              >
                                {item.domainName}
                              </Typography>
                            </Paper>
                          </Box>

                          <Divider sx={{ border: "none", height: "35px" }} />
                          <Stack
                            direction="row"
                            spacing={4}
                            justifyContent="space-evenly"
                          >
                            <Typography sx={{ color: "black" }} variant="h6">
                              Skill:
                            </Typography>
                            <Typography sx={{ color: "#0288d1" }} variant="h6">
                              {item.skillName}
                            </Typography>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={1.5}
                            justifyContent="space-evenly"
                          >
                            <Typography sx={{ color: "black" }} variant="h6">
                              Experience:
                            </Typography>
                            <Typography sx={{ color: "#0288d1" }} variant="h6">
                              {item.expericence}
                            </Typography>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={2.5}
                            justifyContent="space-evenly"
                          >
                            <Typography sx={{ color: "black" }} variant="h6">
                              Level:
                            </Typography>
                            <Tooltip
                              title={
                                labels[
                                  hover !== -1
                                    ? hover
                                    : item.level === "Begginer"
                                    ? 1
                                    : null || item.level === "Intermediate"
                                    ? 2
                                    : null || item.level === "Advanced"
                                    ? 3
                                    : null
                                ]
                              }
                              arrow
                            >
                              <Rating
                                name="simple-controlled"
                                value={
                                  item.level === "BASIC"
                                    ? 1
                                    : null || item.level === "INTERMIDIATE"
                                    ? 2
                                    : null || item.level === "ADVANCED"
                                    ? 3
                                    : null
                                }
                                max={3}
                                getLabelText={getLabelText}
                                onChangeActive={(event, newHover) => {
                                  setHover(newHover);
                                }}
                              />
                            </Tooltip>
                          </Stack>
                        </Paper>
                      ) : (
                        <>
                          <Divider orientation="vertical" />
                        </>
                      )}
                    </>
                  );
                })}
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Stack>
      {/* <FormModal
        check="userSkill"
        setOpen={setOpen}
        addMultipleSkill={addMultipleSkill}
        setAddMultipleSkill={setAddMultipleSkill}
      /> */}
      <EditForm open={open} setOpen={setOpen} Useredit={editUser} />
    </Stack>
  );
}
export default UserSkill;
