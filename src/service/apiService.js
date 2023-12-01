import axios ,{AxiosHeaders }from "axios";
import { strings } from "../utils/strings";

export const apiService = {
  login,
  getUserSkill
};
let req = null
// axios.defaults.withCredentials = true;
let applicationConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

function login(payload) {
  console.log("api hit");

  return axios
    .post(
      strings.auth_api.base_url + strings.auth_api.signin,
      payload,
      { withCredentials: true },
      applicationConfig
    )
    .then((response) => {
      console.log(response.headers['set-cookie']);
       applicationConfig.headers =  response.headers

      return response;
    })
    .catch((error) => {
      return error;
    });
}

function getUserSkill() {
  console.log("skil hit");
  return axios
    .get(
      strings.skill_srv_api.base_url + strings.skill_srv_api.get__add_updated_skil,
      { withCredentials: true },
      applicationConfig
    )
    .then((response) => {
      console.log(response);

      return response;
    })
    .catch((error) => {
      return error;
    });
    // return axios
    // .get(
    //   strings.auth_api.base_url + "currentuser",
    //   { withCredentials: true },
    //   applicationConfig
    // )
    // .then((response) => {
    //   console.log(response);

    //   return response;
    // })
    // .catch((error) => {
    //   console.log(error)
    // });
}
