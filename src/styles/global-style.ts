import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html{
    box-sizing: border-box;
    background: #F5F4F0;
    display:block;
    height: 100%;
    max-width: 640px;
    margin:0 auto;
    padding: 0;
    a {
        text-decoration: none;
      }
  }

  body{
    background: lightgrey;
    height:300vh;
    padding: 1rem;
    margin-top:0;
    font-family:Verdana;
  }
`;
