import { CSSProperties, HTMLAttributes, ReactNode, Ref } from 'react';
import { camelCase } from 'lodash';

// hooks
import { useSX } from '../hooks/sx/useSX';
import { useTheme } from 'hooks';

// others
import { className, classNames, classes } from './classNames';

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
  TUIProps<typeof classes> & {
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
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
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
        classNamesWithTheme[className].name,
        classNamesWithTheme[className].modificators[color],
        classNamesWithTheme[className].modificators[camelCase(fontWeight)],
        classNamesWithTheme[className].modificators[fontStyle],
        classNamesWithTheme[className].modificators[variant],
        [classNamesWithTheme[className].modificators.gutterBottom, gutterBottom],
        [classNamesWithTheme[className].modificators.noWrap, noWrap],
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
