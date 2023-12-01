import axios from "axios";
const url = process.env.user_srv||"http://localhost:3002/skill";
let applicationConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllExperties = () =>
  axios.get(`${url}/expertise`, { withCredentials: true }, applicationConfig);
export const updateSkillsExperties = (id, updatedSkill) =>
  axios.put(
    `${url}/expertise?id=${id}`,
    updatedSkill,
    { withCredentials: true },
    applicationConfig
  );
