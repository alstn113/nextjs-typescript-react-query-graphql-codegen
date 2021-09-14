import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';
const style = css`
  ${emotionReset}
  html {
    box-sizing: border-box;
    background: #f5f4f0;
    display: block;
    height: 100%;
    max-width: 640px;
    margin: 0 auto;
    padding: 0;
    a {
      text-decoration: none;
    }
  }

  body {
    background: lightgrey;
    height: 300vh;
    padding: 1rem;
    margin-top: 0;
    font-family: Verdana;
  }
`;

const GlobalStyle = () => {
  return <Global styles={style} />;
};

export default GlobalStyle;
