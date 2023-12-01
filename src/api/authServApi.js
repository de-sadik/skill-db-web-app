import axios from "axios";
import { async } from "q";
const url =   process.env.auth_api ||"http://localhost:3004/api/users";
let applicationConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

export const signin = async (payload) => {
     return axios
      .post(`${url}/signin`, payload, { withCredentials: true }, applicationConfig)
};

export const signup = async (payload) => {
  return axios
   .post(`${url}/signup`, payload, { withCredentials: true }, applicationConfig)
}