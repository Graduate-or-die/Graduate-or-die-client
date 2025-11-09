import React from "react";
import { Routes, Route } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { PomeStyles } from "./styles/PomeStyles.style";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
export default function App() {
  return (
    <>
      <Global styles={PomeStyles} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/my" element={<MyPage />} />
      </Routes>
    </>
  );
}
