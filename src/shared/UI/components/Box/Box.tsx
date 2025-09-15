import cx from 'classnames';
import { createElement, FC, HTMLAttributes, ReactNode, Ref } from 'react';

// hooks
import { useSX } from '../../hooks/sx/useSX';

// others
import { classes } from './classNames';

// types
import { E2EAttribute } from 'types';
import { TBoxHTMLTag } from './types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import { TUIProps } from '../../types';

// utils
import { getAttributes } from '../../../E2EDataAttributes/utils';

export type TBoxProps = Omit<HTMLAttributes<HTMLElement>, 'className'> &
  TUIProps<typeof classes> & {
    children?: ReactNode;
    component?: TBoxHTMLTag;
    e2eAttribute?: TE2EDataAttributeProps['type'];
    e2eValue?: TE2EDataAttributeProps['value'];
    ref?: Ref<HTMLElement>;
  };

export const Box: FC<TBoxProps> = ({
  attributes = {},
  children,
  classes = { className: '' },
  component = 'div',
  depsSx = [],
  e2eAttribute = E2EAttribute.box,
  e2eValue = '',
  ref,
  style = {},
  sx = {},
  ...restProps
}) => {
  const sxClassName = useSX(depsSx, sx);

  return createElement(
    component,
    {
      ...restProps,
      className: cx(sxClassName, classes.className),
      ...getAttributes(e2eAttribute, e2eValue),
      ...attributes,
      ref,
      style,
    },
    children,
  );
};

export default Box;
