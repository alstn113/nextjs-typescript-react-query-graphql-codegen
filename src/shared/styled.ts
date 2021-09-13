import styled from 'styled-components';

export const ReviewCard = styled.div`
  ${({ theme }) => theme.shadow}
  background: white;
  margin: 60px auto;
  padding: 1px 20px 20px 90px;
  position: relative;
  h2 {
    margin-bottom: 0;
  }
  small {
    margin-right: 10px;
    color: #777;
  }
`;
export const ReviewRating = styled.div`
  ${({ theme }) => theme.flexCenter}
  position: absolute;
  top: -20px;
  left: -20px;
  background: #8e2ad6;
  font-size: 3em;
  width: 90px;
  height: 90px;
  color: white;
`;
