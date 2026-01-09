import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const PomeStyles = css`
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;
  }

  button,
  a {
    cursor: pointer;
  }

  button {
    padding: 0;
    border: none;
    background-color: transparent;
  }

  a {
    text-decoration: none;
    color: inherit;
    -webkit-user-drag: none;
  }

  button,
  input,
  textarea,
  select,
  meter,
  progress {
    appearance: none;
    font-family: inherit;
    border: none;
    outline: none;
    padding: 0;
  }

  b {
    font-weight: 700;
  }

  #root {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 320px;
    max-width: 768px;
    min-height: 100vh;
    margin: 0 auto;
    background-color: white;
    overflow-y: auto;
  }
  * {
    box-sizing: border-box;
  }
`;
