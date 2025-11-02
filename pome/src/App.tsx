import React from "react";
import { Routes, Route } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { PomeStyles } from "./styles/PomeStyles.style";
import IntroPage from "./pages/IntroPage";
import MyPage from "./pages/MyPage";
export default function App() {
  return (
    <>
      <Global styles={PomeStyles} />
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/my" element={<MyPage />} />
      </Routes>
    </>
  );
}
