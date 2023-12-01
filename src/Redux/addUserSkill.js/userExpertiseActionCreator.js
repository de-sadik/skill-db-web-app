import * as api from "../../api/index";
import ActionTypes from "../Actions/Action";

export const getSkillExperties = (handler) => async (dispatch) => {
  try {
    const response = await api.getAllExperties();
    const palyoad = response.data.response.map((skill) => {
      return {
        id: skill.id,
        domainName: skill.domainName,
        skillName: skill.skill,
        level: skill.levelOfExperience,
        expericence: skill.yearOfExperience,
      };
    });
    handler(response);
    dispatch({ type: ActionTypes.GET_ALL_SKILL_Experties, payload: palyoad });
  } catch (error) {
    handler(error.response);
  }
};

export const updateskill = (id, data, handler) => async (dispatch) => {
  try {
    debugger;
    const response = await api.updateSkillsExperties(id, data);
    handler(response);
    let updatedData = response.data.response
    let payload = {
      id: updatedData.id, 
      domainName: updatedData.domainName,
      skillName: updatedData.skill,
      level: updatedData.levelOfExperience,
        expericence: updatedData.yearOfExperience 
    };
    dispatch({ type: ActionTypes.UPDATE_SKILL_Experties, payload: payload });
  } catch (error) {
    handler(error.response);
  }
};
