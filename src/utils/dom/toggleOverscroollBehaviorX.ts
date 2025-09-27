import { CSSProperties } from 'react';

export const toggleOverscroollBehaviorX = (state: CSSProperties['overscrollBehaviorX']): void => {
  document.body.style.overscrollBehaviorX = state;
};
