import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  Paper,
  Stack,
  TextField,
  Divider,
  Button,
  Autocomplete,
  Grid,
  Input,
  Slider,
} from "@mui/material";
import { useForm, Controller, set } from "react-hook-form";
import CancelIcon from "@mui/icons-material/Cancel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { useDispatch } from "react-redux";
import {
  getSkill,
  postSkill,
  updateskill,
} from "../Redux/Addskill/addskillActionCreator";
import { alertUtils } from "../utils/alertUtils";
import Loader from "./loader";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "auto",
  bgcolor: "background.paper",
  borderRadius: "12px",
  // boxShadow: 24,
  p: 4,
  // overflowY: "scroll",
  // scrollbarWidth: "none",
  // scrollbarColor: " #6969dd #e0e0e0",
  // scrollbarRadiusTopRight: "12px",
};
const FormModal = ({
  open,
  setEdit,
  setOpen,
  addMultipleSkill,
  setAddMultipleSkill,
  check,
  editData,

  // isUpadte,
  // Useredit,
}) => {
  const {
    register,
    formState: { errors },
    control,
  } = useForm();
  const dispatch = useDispatch();
  // const [obj, setObj] = useState({
  //   domain: "",
  //   skills: null,
  // });
  const [isLoader, setLoader] = useState(false);
  const [skill, setSkill] = useState("");
  const [domainName, setDomainname] = useState("");
  const [selectedSkill, setSelectdSkill] = useState([]);
  // const [add, setAdd] = useState([]);
  // const [collect, setCollect] = useState([]);
  const top100Films = ["tech1", "tech2"];
  const userSkill = ["React", "Node", "Python", "JavaScript"];
  const [userObj, setUserObj] = useState({
    domain: "",
    skillName: "",
    expericence: 0,
    level: "Begginer",
  });
  ///this state is used for storing experience value
  const [value, setValue] = React.useState(0);

  // const [dom, setDom] = useState();
  // const [uSkill, setUskill] = useState();

  const handleClose = () => {
    setOpen(false);
    if(JSON.stringify(editData) !== JSON.stringify({})){
      setEdit({});
    }
    setSkill("");
    setAddMultipleSkill([]);
    setDomainname("");
  };
  const handleChnage = (e) => {
    e.preventDefault();
    if (e.target.name === "skill") {
      setSkill(e.target.value);
    }
    if (e.target.name === "domain") {
      if (JSON.stringify(editData) !== JSON.stringify({})) {
        editData.domainName = "";
      }
      setDomainname(e.target.value);
    }
  };
  const Addskills = () => {
    setAddMultipleSkill([...addMultipleSkill, skill]);
    setSelectdSkill([...selectedSkill, skill]);
    setSkill("");
  };

  const handler = (response) => {
    setLoader(false);
    if (response.status === 200) {
      setAddMultipleSkill([]);
      setDomainname("");

      alertUtils
        .successAlert("Skill Updated", "", "success", false)
        .then((alertResponse) => {
          setEdit({});
          setOpen(false);
        })
        .catch(() => {});
    }
    if (response.status === 201) {
      setAddMultipleSkill([]);
      setDomainname("");
      alertUtils
        .successAlert("Skill added", "", "success", false)
        .then((alertResponse) => {
          setOpen(false);
        })
        .catch(() => {});
    }
    if (response.status === 401 || response.status === 400) {
      alertUtils
        .successAlert("", response.data.errors[0].message, "error", false)
        .then((alertResponse) => {})
        .catch(() => {});
    }
  };

  const handleSubmit = (id) => {
    debugger;
    let ob = { domainName: domainName, skillName: addMultipleSkill };
    if (JSON.stringify(editData) === JSON.stringify({})) {
      setLoader(true);
      dispatch(postSkill(ob, handler));
    }
    if (JSON.stringify(editData) !== JSON.stringify({})) {
      ob = {
        domainName: editData.domainName ? editData.domainName : domainName,
        skillName: addMultipleSkill,
      };
      setLoader(true);
      dispatch(updateskill(id, ob, handler));
    }
    // setObj({ ...obj, domainName: domainName, skills: addMultipleSkill});
    // setAddMultipleSkill([...addMultipleSkill, ob]);
    // setSelectdSkill([]);
    // setDomainname("");
    // setAdd([]);
  };

  const removeSkill = (skill) => {
    const result = addMultipleSkill.filter((item) => item != skill);
    setAddMultipleSkill([...result]);
    setSelectdSkill([...result]);
  };

  const handleSliderChange = (event, newValue) => {
    setUserObj({ ...userObj, expericence: newValue });
    setValue(newValue);
  };
  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const skillLevel = [
    {
      value: 0,
      label: "Begginer",
    },
    {
      value: 10,
      label: "Intermediate",
    },
    {
      value: 20,
      label: "Advanced",
    },
  ];
  const handleSlider = (item) => {
    const { name, value } = item;

    if (value === 0) {
      setUserObj({ ...userObj, [name]: "Begginer" });
    } else if (value === 10) {
      setUserObj({ ...userObj, [name]: "Intermediate" });
    } else if (value === 20) {
      setUserObj({ ...userObj, [name]: "Advanced" });
    }
  };

  const handleUserSkill = (obj) => {
    const { name, value } = obj;
    setUserObj({ ...userObj, [name]: value });
  };
  ///submit function for an userSkill
  const handleSubmitUserSkill = () => {
    console.log("enter data", userObj);
    setValue(0);
    setUserObj({
      domain: "",
      skillName: "",
      expericence: 0,
      level: "Begginer",
    });
  };

  return (
    <>
      {isLoader ? (
        <Loader isOpen={isLoader} />
      ) : (
        <>
          {check === "" && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Paper sx={style}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    sx={{ marginLeft: "110px" }}
                  >
                    Add Skills Form!
                  </Typography>
                  <Paper
                    sx={{
                      height: "35px",
                      width: "35px",
                      cursor: "pointer",
                    }}
                  >
                    <CancelIcon
                      onClick={handleClose}
                      sx={{ color: "blue", fontSize: 30, margin: "2px" }}
                    />
                  </Paper>
                </Stack>
                <Divider sx={{ border: "none", height: "25px" }} />
                <Stack direction="column" alignItems="center">
                  <TextField
                    id="outlined-basic"
                    // label="Outlined"
                    name="domain"
                    placeholder="Enter Domain name"
                    variant="outlined"
                    sx={{ width: "350px" }}
                    value={domainName === "" ? editData.domainName : domainName}
                    // onChange={(e) => setObj({ ...obj, domain: e.target.value })}
                    onChange={handleChnage}
                  />
                  <Divider sx={{ border: "none", height: "25px" }} />
                  <Stack direction="row" sx={{ marginLeft: "60px" }}>
                    <TextField
                      id="outlined-basic"
                      name="skill"
                      // label="Outlined"
                      placeholder="Enter Skills"
                      variant="outlined"
                      sx={{ width: "350px" }}
                      value={skill}
                      onChange={handleChnage}
                    />
                    {/* <Button variant="contained" sx={{ marginLeft: "10px" }}> */}
                    <AddCircleIcon
                      onClick={Addskills}
                      sx={{
                        fontSize: 40,
                        marginLeft: "20px",
                        color: "blue",
                        marginTop: "10px",
                        cursor: "pointer",
                      }}
                    />
                    {/* </Button> */}
                  </Stack>
                  <Divider sx={{ border: "none", height: "25px" }} />
                  {addMultipleSkill && addMultipleSkill.length > 0 && (
                    <Box sx={{ height: "250px" }}>
                      <Stack
                        direction="row"
                        spacing={12}
                        rowGap={2}
                        sx={{
                          width: "auto",
                          height: "200px",
                          flexWrap: "wrap",
                          overflowY: "auto",
                          " ::-webkit-scrollbar": {
                            display: "none",
                          },
                        }}
                      >
                        {addMultipleSkill.map((item) => {
                          return (
                            <>
                              <Button
                                variant="contained"
                                endIcon={
                                  <CloseIcon
                                    onClick={() => removeSkill(item)}
                                  />
                                }
                              >
                                {item}
                              </Button>
                            </>
                          );
                        })}
                      </Stack>
                    </Box>
                  )}
                  {addMultipleSkill && addMultipleSkill.length > 0 && (
                    <Divider sx={{ border: "none", height: "25px" }} />
                  )}
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={() => handleSubmit(editData.id)}
                  >
                    Submit
                  </Button>
                </Stack>
              </Paper>
            </Modal>
          )}
          {check === "userSkill" && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Paper sx={style}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    sx={{ marginLeft: "110px" }}
                  >
                    Add UsersSkills Form!
                  </Typography>
                  <Paper
                    sx={{
                      height: "35px",
                      width: "35px",
                      cursor: "pointer",
                    }}
                  >
                    <CancelIcon
                      onClick={handleClose}
                      sx={{ color: "blue", fontSize: 30, margin: "2px" }}
                    />
                  </Paper>
                </Stack>
                <Divider sx={{ border: "none", height: "25px" }} />
                <Stack direction="column" alignItems="center">
                  <Autocomplete
                    // disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    getOptionLabel={(options) => options}
                    value={userObj.domain}
                    sx={{ width: 300 }}
                    onChange={(e, newValue) => {
                      // setDom(newValue);
                      handleUserSkill({ name: "domain", value: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Domain" />
                    )}
                  />

                  <Divider sx={{ border: "none", height: "25px" }} />
                  <Autocomplete
                    id="combo-box-demo"
                    options={userSkill}
                    sx={{ width: 300 }}
                    value={userObj.skillName}
                    onChange={(e, newValue) =>
                      handleUserSkill({ name: "skillName", value: newValue })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="skill"
                        label="Select Skill"
                      />
                    )}
                  />
                  <Divider sx={{ border: "none", height: "25px" }} />
                  <Box sx={{ width: 300, marginRight: "10px" }}>
                    <Typography id="input-slider" gutterBottom>
                      Year of experience
                    </Typography>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <EngineeringIcon />
                      </Grid>
                      <Grid item xs>
                        <Slider
                          value={typeof value === "number" ? value : 0}
                          onChange={handleSliderChange}
                          aria-labelledby="input-slider"
                        />
                      </Grid>
                      <Grid item>
                        <Input
                          value={value}
                          size="small"
                          onChange={handleInputChange}
                          inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: "number",
                            "aria-labelledby": "input-slider",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider sx={{ border: "none", height: "25px" }} />
                  <Typography
                    id="input-slider"
                    gutterBottom
                    sx={{ marginRight: "240px" }}
                  >
                    skill level
                  </Typography>
                  <Slider
                    sx={{ width: "300px" }}
                    track="inverted"
                    aria-labelledby="track-inverted-slider"
                    min={0}
                    max={20}
                    step={10}
                    defaultValue={0}
                    marks={skillLevel}
                    onChange={(e) =>
                      handleSlider({ name: "level", value: e.target.value })
                    }
                  />
                  <Divider sx={{ border: "none", height: "15px" }} />
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmitUserSkill}
                  >
                    Submit
                  </Button>
                </Stack>
              </Paper>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default FormModal;
