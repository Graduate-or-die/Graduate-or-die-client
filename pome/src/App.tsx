import React from "react";
import { Routes, Route } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { PomeStyles } from "./styles/PomeStyles.style";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import RecommendPage from "./pages/RecommendPage";
import MateRouter from "./pages/MateRouter";
import MateDetailPage from "./pages/MateDetailPage";
import CommentPage from "./pages/CommentPage";
import ChatPage from "./pages/ChatPage";
import RequestPage from "./pages/RequestPage";
import MateMatchPage from "./pages/MateMatchPage";
export default function App() {
  return (
    <>
      <Global styles={PomeStyles} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/detail/:category" element={<DetailPage />} />
        <Route path="/mate" element={<MateRouter />} />
        <Route path="/mate/detail/:category" element={<MateDetailPage />} />
        <Route path="/mate/detail/:category/:field" element={<CommentPage />} />
        <Route
          path="/mate/detail/:category/:id/:field"
          element={<CommentPage />}
        />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/match" element={<MateMatchPage />} />{" "}
      </Routes>
    </>
  );
}
