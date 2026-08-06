import cx from 'classnames';
import { CSSProperties, HTMLAttributes, ReactNode, Ref } from 'react';
import { camelCase } from 'lodash';

// hooks
import { useSX } from '../hooks/sx/useSX';

// others

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

const typographyModificators: Record<string, string> = {
  blue1: 'Typography--blue1',
  blue2: 'Typography--blue2',
  bold: 'Typography--bold',
  green1: 'Typography--green1',
  green2: 'Typography--green2',
  gutterBottom: 'Typography--gutter-bottom',
  h1: 'Typography--h1',
  h2: 'Typography--h2',
  h3: 'Typography--h3',
  h4: 'Typography--h4',
  h5: 'Typography--h5',
  h6: 'Typography--h6',
  italic: 'Typography--italic',
  medium: 'Typography--medium',
  neutral1: 'Typography--neutral1',
  neutral2: 'Typography--neutral2',
  neutral3: 'Typography--neutral3',
  neutral4: 'Typography--neutral4',
  neutral5: 'Typography--neutral5',
  noWrap: 'Typography--no-wrap',
  normal: 'Typography--normal',
  orange1: 'Typography--orange1',
  p: 'Typography--p',
  pink1: 'Typography--pink1',
  red1: 'Typography--red1',
  regular: 'Typography--regular',
  skyBlue1: 'Typography--skyBlue1',
  small: 'Typography--small',
  violet1: 'Typography--violet1',
};

export type TTypographyProps = Omit<HTMLAttributes<HTMLElement>, 'className' | 'color'> &
  TUIProps<{ className: string }> & {
    align?: CSSProperties['textAlign'];
    children?: ReactNode;
    color?: ColorsTheme;
    component?: TTypograpghyComponent;
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
  depsSx = [],
  e2eAttribute = E2EAttribute.text,
  e2eValue = '',
  fontStyle = TypographyFontStyle.normal,
  fontWeight = TypographyFontWeight.regular,
  gutterBottom = false,
  innerHtml = '',
  noWrap = false,
  ref,
  style = {},
  sx = {},
  variant = TypographyVariant.p,
  variantMapping = {},
  ...restProps
}: TTypographyProps): ReactNode => {
  const sxClassName = useSX(depsSx, sx);

  if (!children && !innerHtml) {
    return null;
  }

  return renderElement(
    children,
    component,
    {
      ...restProps,
      className: cx(
        sxClassName,
        classes.className,
        styles.Typography,
        styles[typographyModificators[color]],
        styles[typographyModificators[camelCase(fontWeight)]],
        styles[typographyModificators[fontStyle]],
        styles[typographyModificators[variant]],
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
