import styled from "@emotion/styled";
import { styleEffect } from "framer-motion";

export const FormContainer = styled.div`
  width: 364px;
  padding: 16px 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(206, 214, 216, 0.3);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
`;
export const FormName = styled.div`
  align-self: flex-start;
  color: #313334;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0 16px;
`;

export const FormLabel = styled.div`
  color: #555;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const FormBox = styled.input<{ gray?: boolean; disabledTone?: boolean }>`
  width: 325px;
  height: 30px;
  border-radius: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 30px;
  background: ${({ gray, disabledTone }) =>
    gray ? "rgba(206, 214, 216, 0.30)" : disabledTone ? "#CED6D8" : "#fff"};
`;

export const FormBoxArea = styled.textarea`
  width: 325px;
  height: 50px;
  border-radius: 50px;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 30px;
  background: #fff;
`;
export const EduContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const EduFormContainer = styled.div`
  width: 364px;
  padding: 20px 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ced6d8;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
`;
export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

export const CheckBox = styled.div`
  width: 11px;
  height: 11px;
  border-radius: 1px;
  border: 0.5px solid #5b5b5b;
`;

export const CheckFont = styled.div`
  color: #313334;
  font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
`;

export const CheckContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const AttachButton = styled.button`
  width: 56px;
  height: 20px;
  margin-left: 5px;
  border-radius: 17px;
  background: rgba(178, 232, 255, 0.5);
  color: #097795;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Pretendard Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  padding-bottom: 1px;
`;
export const PeriodBox = styled.div`
  width: 325px;
  display: flex;
  gap: 7px;
  align-items: center;
`;
export const DateBox = styled.input`
  width: 150px;
  height: 30px;
  flex: 1;
  border-radius: 50px;
  background: #fff;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 30px;
  text-align: center;
`;
export const FileContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
export const FileBox = styled.input`
  display: none;
`;
export const FileNameBox = styled.input`
  width: 269px;
  background: none;
  height: 30px;
  color: #313334;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 30px;
  font-family: "Pretendard Variable";
  font-size: 12px;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
`;

export const LinkContainer = styled.div`
  width: 325px;
  display: flex;
  gap: 10px;
`;
export const LinkIcon = styled.div`
  width: 31px;
  height: 30px;
  border-radius: 50px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkBox = styled.input`
  flex: 1;
  height: 30px;
  color: #097795;
  border-radius: 50px;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding: 0 10px;
  line-height: 30px;
`;
export const LinkAdd = styled.div`
  width: 325px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px 0;
`;
export const Memo = styled.textarea`
  width: 323px;
  height: 106px;
  border-radius: 20px;
  background: #fff;
  box-sizing: border-box;
  padding: 10px;
  line-height: 1.5;
`;

export const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const SelectCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #0086ab;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 20px;
  svg {
    width: 100%;
    height: 100%;
  }
`;
