import React from "react";
import { Routes, Route } from "react-router-dom";
import { Global, css } from "@emotion/react";
import { PomeStyles } from "./styles/PomeStyles.style";
import MateRouter from "./pages/MateRouter";
import ChatRouter from "./pages/ChatRouter";
import {
  MyPage,
  LoginPage,
  HomePage,
  DetailPage,
  MateDetailPage,
  CommentPage,
  RequestPage,
  MateMatchPage,
  MatePage,
  MyDetailPage,
  MyCommentPage,
} from "./pages/index";
export default function App() {
  return (
    <>
      <Global styles={PomeStyles} />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/detail/:category" element={<DetailPage />} />
        <Route path="/mate" element={<MateRouter />} />
        <Route path="/mate/detail/:category" element={<MateDetailPage />} />
        <Route path="/mate/detail/:category/:field" element={<CommentPage />} />
        <Route
          path="/mate/detail/:category/:id/:field"
          element={<CommentPage />}
        />
        <Route path="/chat" element={<ChatRouter />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/match" element={<MateMatchPage />} />
        <Route path="/matepage" element={<MatePage />} />
        <Route path="/my/detail/:category" element={<MyDetailPage />} />
        <Route path="/my/detail/:category/:field" element={<MyCommentPage />} />
        <Route
          path="/my/detail/:category/:id/:field"
          element={<MyCommentPage />}
        />
      </Routes>
    </>
  );
}
