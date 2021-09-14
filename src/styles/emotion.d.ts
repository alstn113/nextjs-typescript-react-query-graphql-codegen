import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      background: string;
      white: string;
      light_grey1: string;
      light_grey2: string;
      light_violet0: string;
      light_violet1: string;
      light_violet2: string;
      dark_violet0: string;
      dark_violet1: string;
      dark_violet2: string;
    };
    font: {
      small: css;
      medium: css;
      large: css;
      xlarge: css;
    };
    flexCenter: css;
    shadow: css;
  }
}
