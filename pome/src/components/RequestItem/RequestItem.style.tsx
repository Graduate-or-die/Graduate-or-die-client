import styled from "@emotion/styled";
export const RequestContainer = styled.div`
  width: 100%;
  height: 70px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
`;
export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 53px;
  height: 53px;
  margin-left: 13px;
  img {
    width: 53px;
    height: 53px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
export const NameBox = styled.div`
  color: #313334;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const SummaryBox = styled.div`
  color: #313334;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
export const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 0 25px;
`;
export const RejectBox = styled.div`
  width: 69px;
  height: 70px;
  border-radius: 20px;
  background: #8a9193;
  color: #fff;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  align-items: center;
  padding-left: 12px;
  z-index: 1;
`;
export const AllowBox = styled.div`
  width: 72px;
  height: 70px;
  border-radius: 20px;
  background: #b2e8ff;
  color: #313334;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: "Pretendard Variable";
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -24px;
  z-index: 2;
`;
export const SelectBox = styled.div`
  display: flex;
  margin-left: auto;
  position: relative;
`;
