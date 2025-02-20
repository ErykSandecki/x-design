import React from 'react';

export const isControlPressed = (
  event: MouseEvent | React.MouseEvent | React.WheelEvent | WheelEvent,
): boolean => event.metaKey || event.ctrlKey;
