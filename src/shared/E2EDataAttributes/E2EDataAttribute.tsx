import React, { Children, FC, ReactElement } from 'react';

// types
import { E2EType, E2EValue } from './types';

// utils
import { getAttributes } from './utils';

export type TE2EDataAttributeProps = {
  children: ReactElement<HTMLElement>;
  type: E2EType | Array<E2EType>;
  value?: E2EValue | Array<E2EValue>;
};

export const E2EDataAttribute: FC<TE2EDataAttributeProps> = ({
  children,
  type,
  value = '',
}) => {
  const childrenOnly = Children.only(children);

  return React.cloneElement(childrenOnly, getAttributes(type, value));
};

export default E2EDataAttribute;
