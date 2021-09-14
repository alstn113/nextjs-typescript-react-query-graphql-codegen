import { css } from '@emotion/react';

const font = {
  small: css`
    font-size: 0.8rem;
    font-weight: 300;
  `,
  medium: css`
    font-size: 1rem;
    font-weight: 600;
  `,
  large: css`
    font-size: 1.5rem;
    font-weight: 700;
  `,
  xlarge: css`
    font-size: 5rem;
    font-weight: 700;
  `,
};

const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const shadow = css`
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.07);
`;

export const theme = {
  color: {
    white: '#ffffff',
    background: '#ffffff',
    light_grey1: '#868e96',
    light_grey2: '#dddddd',
    light_violet0: '#f3f0ff',
    light_violet1: '#d0bfff',
    light_violet2: '#9775fa',
    dark_violet0: '#845ef7',
    dark_violet1: '#7048e8',
    dark_violet2: '#5f3dc4',
  },
  font,
  flexCenter,
  shadow,
};
