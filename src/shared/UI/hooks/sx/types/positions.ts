import { CSSProperties } from 'react';

// types
import { ZIndex } from 'types/enums/scss/zIndex';

export type TSXPositions = {
  bottom?: CSSProperties['bottom'];
  left?: CSSProperties['left'];
  position?: CSSProperties['position'];
  overflow?: CSSProperties['overflow'];
  right?: CSSProperties['right'];
  top?: CSSProperties['top'];
  zIndex?: ZIndex;
};
