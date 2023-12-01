import axios from "axios";
const url = process.env.skill_srv||"http://localhost:3001";
let applicationConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const addSkills = async (payload) => {
   return axios
    .post(`${url}/skill`, payload, { withCredentials: true }, applicationConfig)
};

export const getAllSkills = () =>
  axios.get(`${url}/skill`, { withCredentials: true }, applicationConfig);
export const updateSkills = (id, updatedSkill) =>
  axios.put(`${url}/skill?id=${id}`, updatedSkill,{ withCredentials: true }, applicationConfig);

  export const deleteSkill = (id) => axios.delete(`${url}/skill?id=${id}`,{ withCredentials: true }, applicationConfig);
