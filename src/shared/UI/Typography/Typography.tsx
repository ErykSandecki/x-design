import cx from 'classnames';
import { CSSProperties, HTMLAttributes, ReactNode, Ref } from 'react';
import { camelCase } from 'lodash';

// others
import { ICON_MODIFICATORS } from './constants';

// styles
import styles from './typography.scss';

// types
import { ColorsTheme, E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import { TTypograpghyComponent, TTypograpghyVariantMapping } from './types';
import { TypographyFontStyle, TypographyFontWeight, TypographyVariant } from './enums';
import { TUIProps } from '../types';

// utils
import { getAttributes } from '../../E2EDataAttributes/utils';
import { renderElement } from './utils/renderElement';

export type TTypographyProps = Omit<HTMLAttributes<HTMLElement>, 'className' | 'color'> &
  TUIProps<{ className: string }> & {
    align?: CSSProperties['textAlign'];
    children?: ReactNode;
    color?: ColorsTheme;
    component?: TTypograpghyComponent | null;
    e2eAttribute?: TE2EDataAttributeProps['type'];
    e2eValue?: TE2EDataAttributeProps['value'];
    fontStyle?: TypographyFontStyle;
    fontWeight?: TypographyFontWeight;
    gutterBottom?: boolean;
    innerHtml?: string;
    noWrap?: boolean;
    ref?: Ref<HTMLElement>;
    variant?: TypographyVariant;
    variantMapping?: TTypograpghyVariantMapping;
  };

export const Typography = ({
  align: textAlign = 'inherit',
  children,
  classes = { className: '' },
  color = ColorsTheme.neutral1,
  component = null,
  e2eAttribute = E2EAttribute.text,
  e2eValue = '',
  fontStyle = TypographyFontStyle.normal,
  fontWeight = TypographyFontWeight.regular,
  gutterBottom = false,
  innerHtml = '',
  noWrap = false,
  ref,
  style = {},
  variant = TypographyVariant.p,
  variantMapping = {},
  ...restProps
}: TTypographyProps): ReactNode => {
  if (!children && !innerHtml) {
    return null;
  }

  return renderElement(
    children,
    component,
    {
      ...restProps,
      className: cx(
        classes.className,
        styles.Typography,
        styles[ICON_MODIFICATORS[color]],
        styles[ICON_MODIFICATORS[camelCase(fontWeight)]],
        styles[ICON_MODIFICATORS[fontStyle]],
        styles[ICON_MODIFICATORS[variant]],
        { [styles['Typography--gutter-bottom']]: gutterBottom },
        { [styles['Typography--no-wrap']]: noWrap },
      ),
      ...getAttributes(e2eAttribute, e2eValue),
      ...(innerHtml ? { dangerouslySetInnerHTML: { __html: innerHtml } } : {}),
      ref,
      style: {
        ...style,
        textAlign,
      },
    },
    variant,
    variantMapping,
  );
};

export default Typography;
