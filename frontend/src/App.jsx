import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Component from "./Component";
import Loading from "./Loading";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Component />} />
      <Route path="/:_id" element={<Loading />} />
    </Routes>
  );
};

export default App;
