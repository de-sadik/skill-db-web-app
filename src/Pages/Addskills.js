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
} from "@mui/material";
import InputFields from "../Components/InputFields";
import { loginStyle } from "../Styles/login";
import { addSkills } from "../Styles/Addskills";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "../Components/FormModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector,useDispatch } from "react-redux";
import { deleteSkill, getSkill } from "../Redux/Addskill/addskillActionCreator";
import { useNavigate } from "react-router";
import { alertUtils } from "../utils/alertUtils";
import Loader from "../Components/loader";
function Addskills() {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [addMultipleSkill, setAddMultipleSkill] = useState([]);
  const [edit, setEdit] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoader,setLoader] = useState(true)
  const navigate = useNavigate();
  const skillData = useSelector((state) => state.addskillReducer);
  console.log("add multiple skills over here", skillData);
  const handleEdit = (item) => {
    setOpen(true);
    setAddMultipleSkill(item.skillName);
    setEdit({ ...edit, ...item });
  };

  const deletHandler = (response) => {
    console.log(response.status)
    setLoader(false)
    if (response.status === 200) {
      dispatch(getSkill)
      alertUtils
        .successAlert("Skill deleted", "", "success", false)
        .then((alertResponse) => {
        })
        .catch(() => {});
    }
    if (response.status === 401 || response.status === 400) {
      alertUtils
        .successAlert("", response.data.errors[0].message, "error", false)
        .then((alertResponse) => {})
        .catch(() => {});
    }
  }
  
  const handleDelete = (item) =>{
    alertUtils
    .confirmationAlert(
      "Delete Domain",
      `Do you want to delete ${item.domainName.toUpperCase()} domain`,
      "warning",
          "Yes",
          "No",
          false
    )
    .then((alertResponse) => {
      if (alertResponse) {
        setLoader(true)
        dispatch(deleteSkill(item.id,deletHandler))
      }
    })
    .catch(() => {
    });
  }

  const removeSkill = (item) => {
    // const result = add.filter((item) => item != skill);
    // setAdd([...result]);
    // setSelectdSkill([...result]);
  };
  console.log("edited item", addMultipleSkill);
  
  
  const handler = (response) => {
    setLoader(false)
    if (response.status === 200) {
      if(response.data.response.length === 0 ){ 
      alertUtils
        .successAlert("", "No skills added ! Please add a skill", "success", false)
        .then((alertResponse) => {
        })
        .catch(() => {});
      }
    }
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
    dispatch(getSkill(handler))
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
              sx={{ margin: "10px" }}
            >
              <Typography variant="h4" sx={addSkills.skillsHeading}>
                Add Skills page
              </Typography>
              <Button
                onClick={handleOpen}
                onDoubleClick={handleClose}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add Skills
              </Button>
            </Stack>
            <Divider />
            {isLoader && (
              <Loader isOpen={isLoader}/>
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
            )}
            {skillData.length > 0 && (
              <Stack
                direction="column"
                sx={{
                  overflow: "hidden",

                  height: "500px",
                }}
              >
                <Box
                  sx={{
                    overflowY: "auto",
                    " ::-webkit-scrollbar": {
                      display: "none",
                    },
                    "& > :not(style)": {
                      m: 5,
                      width: 900,
                      height: 300,
                    },
                  }}
                >
                  {skillData.map((item) => {
                    return (
                      <>
                        <Paper elevation={3}>
                          <Grid container>
                            <Grid item xs={3} alignItems="center">
                              <Paper
                                sx={{
                                  margin: "20px",
                                  width: "auto",
                                  height: 100,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginTop: "100px",
                                  padding: "10px",
                                }}
                              >
                                <Typography
                                  variant="h5"
                                  sx={{
                                    color: "#0288d1",
                                    textTransform: "uppercase",
                                    textAlign: "center",
                                  }}
                                >
                                  {item?.domainName}
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={1}>
                              <Divider
                                orientation="vertical"
                                color="#FDA228"
                                sx={{
                                  height: "200px",
                                  width: "2px",
                                  marginTop: "50px",
                                }}
                              />
                            </Grid>

                            <Grid
                              item
                              xs={7}
                              sx={{
                                height: "300px",
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                sx={{
                                  overflowY: "auto",
                                  " ::-webkit-scrollbar": {
                                    display: "none",
                                  },
                                }}
                              >
                                <Stack
                                  direction="row"
                                  spacing={2}
                                  justifyContent="flex-end"
                                  sx={{
                                    marginTop: "5px",
                                  }}
                                >
                                  <EditIcon onClick={() => handleEdit(item)} />
                                  <DeleteIcon onClick={() => handleDelete(item)}/>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent="center"
                                  alignItems="center"
                                  spacing={8}
                                  rowGap={2}
                                  flexWrap="wrap"
                                >
                                  {item.skillName.map((skill) => {
                                    return (
                                      <>
                                        <Button
                                          sx={{ margin: "3px" }}
                                          variant="contained"
                                          endIcon={
                                            <ClearIcon
                                              onClick={() => removeSkill(skill)}
                                            />
                                          }
                                        >
                                          {skill}
                                        </Button>
                                      </>
                                    );
                                  })}
                                </Stack>
                                <Divider
                                  sx={{ border: "none", height: "10px" }}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </Paper>
                      </>
                    );
                  })}
                </Box>
              </Stack>
            )}
          </Paper>
        </Box>
      </Stack>
      <FormModal
        check=""
        setEdit={setEdit}
        open={open}
        setOpen={setOpen}
        addMultipleSkill={addMultipleSkill}
        setAddMultipleSkill={setAddMultipleSkill}
        editData={edit}
      />
    </Stack>
  );
}
export default Addskills;
