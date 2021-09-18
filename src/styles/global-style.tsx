import { Global, css, useTheme } from '@emotion/react';
import emotionReset from 'emotion-reset';

export const GlobalStyle = () => {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        ${emotionReset}
        * {
          box-sizing: border-box;
          ::-webkit-scrollbar {
            display: none;
          }
        }
        html {
          background: ${theme.color.background};
          margin: 0 auto;
        }

        body {
          max-width: 1024px;
          padding: 50px;
          margin: 0 auto;
        }
        a {
          text-decoration: none;
          color: #8e2ad6;
          border-bottom: 1px dotted;
        }
      `}
    />
  );
};
