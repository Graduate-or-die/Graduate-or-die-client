import styled from "@emotion/styled";
export const PageWrapper = styled.div`
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 90px 12px 0;
`;
export const FormContainer = styled.div`
  width: 100%;
  max-width: 390px;
  min-height: 333px;
  border-radius: 20px;
  border: 1px solid #ced6d8;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 12px;
  box-sizing: border-box;
  margin: 0 auto;
`;
export const FormFieldBox = styled.div`
  color: #313334;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: left;
  height: 40px;
  padding: 0 10px;
  align-items: center;
`;
export const FormBoard = styled.div`
  width: 100%;
  max-width: 370px;
  min-height: 275px;
  border-radius: 20px;
  background: rgba(206, 214, 216, 0.3);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  padding: 10px;
  white-space: pre-wrap;
  word-break: break-word;
`;
export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px auto 70px;
  gap: 10px;
  padding: 0 auto;
`;
export const CommentRow = styled.div`
  color: #313334;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
export const EtcBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
export const CommentBox = styled.div`
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  gap: 8px;
`;
export const NoCommentBox = styled.div`
  color: #313334;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  padding: 0 10px;
`;
export const EditButton = styled.div`
  margin-left: auto;
  font-size: 12px;
  color: #6b6b6b;
  cursor: pointer;
`;
