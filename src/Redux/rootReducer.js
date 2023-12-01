import { combineReducers } from "redux";
import addskillReducer from "./Addskill/addskillReducer";
import addsExpertiesReducer from "./addUserSkill.js/userExpertiseReducer";
import authReducer from "./Auth/authReducer";
const reducers = combineReducers({
  addskillReducer,
  authReducer ,
  addsExpertiesReducer,
});

export default reducers;
