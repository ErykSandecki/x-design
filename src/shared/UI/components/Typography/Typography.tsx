import { camelCase } from 'lodash';
import { CSSProperties, HTMLAttributes, ReactNode, Ref } from 'react';

// hooks
import { useTheme } from '../../../../hooks/useTheme/useTheme';

// others
import { classes, className, classNames } from './classNames';

// styles
import styles from './typography.scss';

// types
import { ColorsTheme, E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import { TTypograpghyComponent, TTypograpghyVariantMapping } from './types';
import {
  TypographyFontStyle,
  TypographyFontWeight,
  TypographyFontType,
} from './enums';
import { TUIProps } from '../../types';

// utils
import { getAttributes } from '../../../E2EDataAttributes/utils';
import { renderElement } from './utils/renderElement';

export type TTypographyProps = Omit<
  HTMLAttributes<HTMLElement>,
  'className' | 'color'
> &
  TUIProps<typeof classes> & {
    align?: CSSProperties['textAlign'];
    children?: ReactNode;
    color?: ColorsTheme;
    component?: TTypograpghyComponent;
    e2eAttribute?: TE2EDataAttributeProps['type'];
    e2eValue?: TE2EDataAttributeProps['value'];
    fontStyle?: TypographyFontStyle;
    fontType?: TypographyFontType;
    fontWeight?: TypographyFontWeight;
    gutterBottom?: boolean;
    innerHtml?: string;
    noWrap?: boolean;
    ref?: Ref<HTMLElement>;
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
  fontType = TypographyFontType.p,
  fontWeight = TypographyFontWeight.regular,
  gutterBottom = false,
  innerHtml = '',
  noWrap = false,
  ref,
  style = {},
  variantMapping = {},
  ...restProps
}: TTypographyProps) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  if (!children && !innerHtml) {
    return null;
  }

  return renderElement(
    children,
    component,
    fontType,
    {
      ...restProps,
      className: cx(
        classes.className,
        classNamesWithTheme[className].name,
        classNamesWithTheme[className].modificators[color],
        classNamesWithTheme[className].modificators[camelCase(fontWeight)],
        classNamesWithTheme[className].modificators[fontStyle],
        classNamesWithTheme[className].modificators[fontType],
        [
          classNamesWithTheme[className].modificators.gutterBottom,
          gutterBottom,
        ],
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
    variantMapping,
  );
};

export default Typography;
