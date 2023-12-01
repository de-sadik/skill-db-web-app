import * as api from "../../api/index";
import ActionTypes  from "../Actions/Action";

export const signin = (postData,handler) => async (dispatch) => {
  debugger
  try {
    const response = await api.signin(postData)
    handler(response)
    dispatch({ type: ActionTypes.SIGNIN, payload: response.data });
  } catch (error) {
    handler(error.response)
  }
};

export const signup = (postData,handler) => async (dispatch) => {
  try {
    const response = await api.signup(postData)
    handler(response)
    dispatch({ type: ActionTypes.SIGNUP, payload: response.data });
  } catch (error) {
    handler(error.response)
  }
};


