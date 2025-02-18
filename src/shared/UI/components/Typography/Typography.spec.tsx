import { render } from '@testing-library/react';

// components
import Typography from './Typography';

// others
import { className as classNameTypography, classNames } from './classNames';

// types
import { ColorsTheme } from 'types';
import { E2EAttribute } from 'types/e2e';
import {
  TypographyFontStyle,
  TypographyFontWeight,
  TypographyVariant,
} from './enums';

// utils
import { enumToArray } from 'utils';
import { getByE2EAttribute } from 'test/testHelpers';
import { getDataTestAttribute } from '../../../E2EDataAttributes/utils';

const className = 'className';

describe('Typography props', () => {
  it('should pass align', () => {
    // mock
    const align = 'center';

    // before
    const { container } = render(
      <Typography align={align}>children</Typography>,
    );

    // result
    expect(getByE2EAttribute(container, E2EAttribute.text)).toHaveAttribute(
      'style',
      `text-align: ${align};`,
    );
  });

  it('should pass children', () => {
    // mock
    const children = 'children';

    //before
    const { container } = render(<Typography>{children}</Typography>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.text)).toHaveTextContent(
      children,
    );
  });

  it('should pass classes', () => {
    //before
    const { container } = render(
      <Typography classes={{ className }}>children</Typography>,
    );

    // result
    expect(container.querySelector(`.${className}`)).not.toBeNull();
  });

  it('should pass color', () => {
    // before
    const { container } = render(
      <Typography classes={{ className }} color={ColorsTheme.blue1}>
        children
      </Typography>,
    );

    // result
    expect(container.querySelector(`.${className}`)).toHaveClass(
      `${classNameTypography}--${ColorsTheme.blue1}`,
    );
  });

  it('should pass component', () => {
    // before
    const { container } = render(
      <Typography classes={{ className }} component="a">
        children
      </Typography>,
    );

    // result
    expect(container.querySelector(`.${className}`).tagName).toBe('A');
  });

  it('should pass e2eAttribute', () => {
    // before
    const { container } = render(
      <Typography e2eAttribute={E2EAttribute.text}>children</Typography>,
    );

    // result
    expect(getByE2EAttribute(container, E2EAttribute.text)).toHaveAttribute(
      getDataTestAttribute(E2EAttribute.text),
    );
  });

  it('should pass e2eValue', () => {
    // mock
    const e2eValue = 'e2eValue';

    // before
    const { container } = render(
      <Typography e2eValue={e2eValue}>children</Typography>,
    );

    // result
    expect(getByE2EAttribute(container, E2EAttribute.text)).toHaveAttribute(
      getDataTestAttribute(E2EAttribute.text),
      e2eValue,
    );
  });

  it('should pass fontStyle', () => {
    // mock
    const fontStyles = enumToArray<TypographyFontStyle>(TypographyFontStyle);

    //before
    const { container } = render(
      <>
        {fontStyles.map((fontStyle) => (
          <Typography
            e2eValue={fontStyle}
            fontStyle={fontStyle}
            key={fontStyle}
          >
            children
          </Typography>
        ))}
      </>,
    );

    // result
    fontStyles.forEach((fontStyle) => {
      expect(
        getByE2EAttribute(container, E2EAttribute.text, fontStyle),
      ).toHaveClass(classNames[classNameTypography].modificators[fontStyle]);
    });
  });

  it('should pass fontWeight', () => {
    // mock
    const fontWeights = enumToArray<TypographyFontWeight>(TypographyFontWeight);

    //before
    const { container } = render(
      <>
        {fontWeights.map((fontWeight) => (
          <Typography
            e2eValue={fontWeight}
            fontWeight={fontWeight}
            key={fontWeight}
          >
            children
          </Typography>
        ))}
      </>,
    );

    // result
    fontWeights.forEach((fontWeight) => {
      expect(
        getByE2EAttribute(container, E2EAttribute.text, fontWeight),
      ).toHaveClass(classNames[classNameTypography].modificators[fontWeight]);
    });
  });

  it('should pass gutterBottom', () => {
    // before
    const { container } = render(
      <Typography classes={{ className }} gutterBottom>
        children
      </Typography>,
    );

    // result
    expect(container.querySelector(`.${className}`)).toHaveClass(
      classNames[classNameTypography].modificators.gutterBottom,
    );
  });

  it('should pass innerHtml', () => {
    // mock
    const children = 'children';
    const htmlTag = 'span';

    //before
    const { container } = render(
      <Typography innerHtml={`<${htmlTag}>${children}</${htmlTag}>`} />,
    );

    // result
    expect(container.getElementsByTagName(htmlTag)[0]).not.toBeNull();

    expect(container.getElementsByTagName(htmlTag)[0]).toHaveTextContent(
      children,
    );
  });

  it('should pass noWrap', () => {
    //before
    const { container } = render(<Typography noWrap>children</Typography>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.text)).toHaveClass(
      classNames[classNameTypography].modificators.noWrap,
    );
  });

  it('should pass variant', () => {
    // mock
    const variants = enumToArray<TypographyVariant>(TypographyVariant);

    //before
    const { container } = render(
      <>
        {variants.map((fontType) => (
          <Typography e2eValue={fontType} variant={fontType} key={fontType}>
            children
          </Typography>
        ))}
      </>,
    );

    // result
    variants.forEach((fontType) => {
      expect(
        getByE2EAttribute(container, E2EAttribute.text, fontType),
      ).toHaveClass(classNames[classNameTypography].modificators[fontType]);

      expect(container.getElementsByTagName(fontType)[0]).not.toBeNull();
    });
  });

  it('should pass variantMapping', () => {
    //before
    const { container } = render(
      <Typography variantMapping={{ p: 'a' }}>children</Typography>,
    );

    // result
    expect(getByE2EAttribute(container, E2EAttribute.text).tagName).toBe('A');
  });
});

describe('Typography snapshots', () => {
  it('should render empty', () => {
    //before
    const { asFragment } = render(<Typography />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with some text', () => {
    // before
    const { asFragment } = render(<Typography>Text</Typography>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with passed inner html', () => {
    // before
    const { asFragment } = render(
      <Typography innerHtml={'<div>innerHtml</div>'} />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
