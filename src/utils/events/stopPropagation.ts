import React from 'react';

export const stopPropagation = (event: KeyboardEvent | React.KeyboardEvent<any>): void => {
  event.stopPropagation();
};
