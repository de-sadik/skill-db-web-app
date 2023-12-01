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
import { alertUtils } from "../utils/alertUtils";
import { useDispatch } from "react-redux";
import { updateskill } from "../Redux/addUserSkill.js/userExpertiseActionCreator";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 430,
  bgcolor: "background.paper",
  borderRadius: "12px",
  // boxShadow: 24,
  p: 4,
  // overflowY: "scroll",
  // scrollbarWidth: "none",
  // scrollbarColor: " #6969dd #e0e0e0",
  // scrollbarRadiusTopRight: "12px",
};
const EditForm = ({ open, Useredit, setOpen }) => {
  const [collect, setCollect] = useState([]);
  const top100Films = ["tech1", "tech2"];
  const userSkill = ["React", "Node", "Python", "JavaScript"];
  const [userObj, setUserObj] = useState({
    domain: "",
    skillName: "",
    expericence: null,
    level: "",
  });
  console.log(userObj);
  ///this state is used for storing experience value
  const [value, setValue] = React.useState(null);
  const dispatch = useDispatch()

  //   const [dom, setDom] = useState(Useredit.domain);
  //   const [uSkill, setUskill] = useState(Useredit.skillName);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSliderChange = (event, newValue) => {
    // console.log({ ...userObj, expericence: newValue })
    setUserObj({ ...userObj, expericence: newValue });
    setValue(newValue);
  };
  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const skillLevel = [
    {
      value: 0,
      label: "BASIC",
    },
    {
      value: 10,
      label: "INTERMIDIATE",
    },
    {
      value: 20,
      label: "ADVANCED",
    },
  ];
  const handleSlider = (item) => {
    const { name, value } = item;

    if (value === 0) {
      setUserObj({ ...userObj, [name]: "BASIC" });
    } else if (value === 10) {
      setUserObj({ ...userObj, [name]: "INTERMIDIATE" });
    } else if (value === 20) {
      setUserObj({ ...userObj, [name]: "ADVANCED" });
    }
  };

  // const handleUserSkill = (obj) => {
  //   const { name, value } = obj;
  //   setUserObj({ ...userObj, [name]: value });
  // };
  const handler = (response) => {
    // setLoader(false);
    if (response.status === 200) {
      // setAddMultipleSkill([]);
      // setDomainname("");

      alertUtils
        .successAlert("Skill Updated", "", "success", false)
        .then((alertResponse) => {
          // setEdit({});
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
  ///submit function for an userSkill
  const handleSubmitUserSkill = () => {
    console.log("enter data", userObj);
    const payload = {"levelOfExperience": userObj.level,"yearOfExperience":userObj.expericence}
    dispatch(updateskill(userObj.id,payload,handler))

    // setUserObj()
  };
 let level = {"BASIC":0, "INTERMIDIATE":10,"ADVANCED":20}
  useEffect(() => {
    if(JSON.stringify(Useredit)!== '{}'){
      console.log(`cll`,Useredit)
    setUserObj(Useredit);
    setValue(Useredit.expericence)
     
  }
  }, [Useredit]);
  return (
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
            Edit UsersSkills Form!
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
            disabled
            id="combo-box-demo"
            options={top100Films}
            getOptionLabel={(options) => options}
            value={Useredit.domainName}
            sx={{ width: 300 }}
            // onChange={(e, newValue) => {
            //   // setDom(newValue);
            //   handleUserSkill({ name: "domain", value: newValue });
            // }}
            renderInput={(params) => (
              <TextField {...params} label="Select Domain" />
            )}
          />

          <Divider sx={{ border: "none", height: "25px" }} />
          <Autocomplete
            disabled
            id="combo-box-demo"
            options={userSkill}
            sx={{ width: 300 }}
            value={Useredit.skillName}
            // onChange={(e, newValue) =>
            //   handleUserSkill({ name: "skillName", value: newValue })
            // }
            renderInput={(params) => (
              <TextField {...params} name="skill" label="Select Skill" />
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
                  value={value === null ? Useredit.expericence : value}
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
            defaultValue={level[Useredit.level]}
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
  );
};
export default EditForm;
