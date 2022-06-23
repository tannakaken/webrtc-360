import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/Auth/Login";
import Main from "./screens/Main/Main";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
