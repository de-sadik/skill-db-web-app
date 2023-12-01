import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Addskills from "../Pages/Addskills";
import Login from "../Pages/Login";
import Query from "../Pages/Query";
import UserSkill from "../Pages/UserSkill";
const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/addSkills" element={<Addskills />} />
        <Route path="/userSkills" element={<UserSkill />} />
        <Route path="/query" element={<Query />} />
      </Routes>
    </div>
  );
};
export default Routing;
