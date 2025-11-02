import styled from "@emotion/styled";
export const ProfileContainer = styled.div`
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
`;
export const ProfileBox = styled.div`
  display: flex;
  margin-top: 4px;
`;
export const ProfileFont = styled.span`
  color: #313334;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 30px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  padding: 10px;
`;

export const NameEditable = styled.input<{ isEditing: boolean }>`
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 30px;
  font-style: normal;
  color: ${({ isEditing }) => (isEditing ? "#000" : "#313334")};
  font-weight: ${({ isEditing }) => (isEditing ? "500" : "300")};
  line-height: normal;
`;
export const DetailContainer = styled.div`
  width: 100%;
  height: 550px;
  flex-shrink: 0;
  border-radius: 30px 30px 0 0;
  background: #fff;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.1);
`;
export const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const HeartCount = styled.div`
  color: #5b5b5b;
  font-family: "Pretendard Variable";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 6px;
`;
export const HeartBox = styled.div`
  display: flex;
  padding: 20px;
`;
export const EditBox = styled.div`
  display: flex;
  padding: 20px;
`;
export const InfoContainer = styled.div`
  padding: 6px;
  margin-bottom: 50px;
`;
export const InfoDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
export const InfoBox1 = styled.span`
  color: #5b5b5b;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const InfoBox2 = styled.span`
  display: flex;
  color: #313334;
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  gap: 10px;
`;

export const EditableInput = styled.input<{ isEditing: boolean }>`
  width: 100%;
  height: 100%;
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-weight: 500;
  line-height: normal;
  border-radius: 4px;
  color: ${({ isEditing }) => (isEditing ? "#000" : "#313334")};
  box-sizing: border-box;
  outline: none;
`;
