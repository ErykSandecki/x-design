import React from 'react';

export const stopPropagation = (
  event: MouseEvent | React.MouseEvent | KeyboardEvent | React.KeyboardEvent<any>,
): void => {
  event.stopPropagation();
};
