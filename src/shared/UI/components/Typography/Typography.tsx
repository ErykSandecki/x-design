import { camelCase } from 'lodash';
import {
  createElement,
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  Ref,
} from 'react';

// hooks
import { useTheme } from '../../../../hooks/useTheme/useTheme';

// others
import { className as classNameTypography, classNames } from './classNames';

// styles
import styles from './typography.scss';

// types
import { ColorsTheme } from 'types/enums/scss/colorsTheme';
import { E2EAttribute } from 'types/e2e';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import {
  TypographyFontStyle,
  TypographyFontWeight,
  TypographyFontType,
} from './enums';

// utils
import { getAttributes } from '../../../E2EDataAttributes/utils';

export type TTypographyProps = Omit<HTMLAttributes<HTMLElement>, 'color'> & {
  align?: CSSProperties['textAlign'];
  children?: ReactNode;
  color?: ColorsTheme;
  e2eAttribute?: TE2EDataAttributeProps['type'];
  e2eValue?: TE2EDataAttributeProps['value'];
  fontStyle?: TypographyFontStyle;
  fontType?: TypographyFontType;
  fontWeight?: TypographyFontWeight;
  innerHtml?: string;
  noWrap?: boolean;
  ref?: Ref<HTMLElement>;
  withoutMargin?: boolean;
};

export const Typography = forwardRef<HTMLElement, TTypographyProps>(
  (
    {
      align: textAlign = 'inherit',
      children,
      className = '',
      color = ColorsTheme.neutral1,
      e2eAttribute = E2EAttribute.text,
      e2eValue = '',
      fontStyle = TypographyFontStyle.normal,
      fontType = TypographyFontType.p,
      fontWeight = TypographyFontWeight.regular,
      innerHtml = '',
      noWrap = false,
      style = {},
      withoutMargin = true,
      ...restProps
    },
    ref,
  ) => {
    const { classNamesWithTheme, cx } = useTheme(classNames, styles);

    if (!children && !innerHtml) {
      return null;
    }

    return createElement(
      fontType,
      {
        ...restProps,
        className: cx(
          className,
          classNamesWithTheme[classNameTypography].name,
          classNamesWithTheme[classNameTypography].modificators[color],
          classNamesWithTheme[classNameTypography].modificators[
            camelCase(fontWeight)
          ],
          classNamesWithTheme[classNameTypography].modificators[fontStyle],
          classNamesWithTheme[classNameTypography].modificators[fontType],
          [
            classNamesWithTheme[classNameTypography].modificators.noWrap,
            noWrap,
          ],
          [
            classNamesWithTheme[classNameTypography].modificators.withoutMargin,
            withoutMargin,
          ],
        ),
        ...getAttributes(e2eAttribute, e2eValue),
        ...(innerHtml
          ? { dangerouslySetInnerHTML: { __html: innerHtml } }
          : {}),
        ref,
        style: {
          ...style,
          textAlign,
        },
      },
      children,
    );
  },
);

export default Typography;
