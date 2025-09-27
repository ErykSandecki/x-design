import React, { Children, FC, ReactElement } from 'react';

// types
import { TE2EType, TE2EValue } from './types';

// utils
import { getAttributes } from './utils';

export type TE2EDataAttributeProps = {
  children: ReactElement<HTMLElement>;
  type: TE2EType | Array<TE2EType>;
  value?: TE2EValue | Array<TE2EValue>;
};

export const E2EDataAttribute: FC<TE2EDataAttributeProps> = ({ children, type, value = '' }) => {
  const childrenOnly = Children.only(children);

  return React.cloneElement(childrenOnly, getAttributes(type, value));
};

export default E2EDataAttribute;
