import * as api from "../../api/index";
import ActionTypes  from "../Actions/Action";
// import {ActionTypes} from "../Actions/Action";
export const getSkill = (handler) => async (dispatch) => {
  try {
    debugger
    const response = await api.getAllSkills();
    const palyoad = response.data.response.map((skill)=>{
      return { "id":skill.id,"domainName":skill.domainName, "skillName":skill.skillName}
    })
    handler(response)
    dispatch({ type: ActionTypes.GET_ALL_SKILLS, payload: palyoad });
  } catch (error) {
    handler(error.response)
  }
};

export const postSkill = (postData,handler) => async (dispatch) => {
  try {
    const response = await api.addSkills(postData)
    const data = response.data.response
    const palyoad =  { "id":data.id,"domainName":data.domainName, "skillName":data.skillName}
    handler(response)
    // skillarr.push(palyoad)
    dispatch({ type: ActionTypes.CREATE_SKILLS, payload: palyoad });
  } catch (error) {
    handler(error.response)
  }
};

export const updateskill = (id, data,handler) => async (dispatch) => {
  try {
    debugger
    const response = await api.updateSkills(id, data);
    handler(response)
    let payload = { "id":id,"domainName":data.domainName, "skillName":data.skillName}
    dispatch({ type: ActionTypes.UPDATE_SKILLS, payload: payload });
  } catch (error) {
    handler(error.response)

  }
};

export const deleteSkill = (id,handler) => async (dispatch) => {
  try {
    debugger
    const response =  await api.deleteSkill(id);
    handler(response)
    dispatch({ type: ActionTypes.DELETE_SKILLS, payload: id });
  } catch (error) {

    handler(error.response)
    // handler(error)
  }
};
