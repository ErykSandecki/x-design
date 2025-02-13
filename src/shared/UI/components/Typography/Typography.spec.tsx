import { render } from '@testing-library/react';

// components
import Typography from './Typography';

// others
import { COLORS } from 'constant/scss/variables/colors';
import { className as classNameTypography, classNames } from './classNames';
import { TYPOGRAPHY_COLORS_MODE } from './constants';

// types
import { E2EAttribute } from 'types/e2e';
import {
  TypographyFontStyle,
  TypographyFontType,
  TypographyFontWeight,
} from './enums';

// utils
import { getByE2EAttribute } from 'test/testHelpers';
import { getDataTestAttribute } from '../../../E2EDataAttributes/utils';
import { enumToArray } from 'utils/transform/enumToArray';
import { hexToRgb } from '../../../../utils/transform/hexToRgb/hexToRgb';

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

  it('should pass applyInlineColors', () => {
    // mock
    const rgb = hexToRgb(COLORS.neutral1Light);

    // before
    const { container } = render(
      <Typography applyInlineColors>children</Typography>,
    );

    // result
    expect(getByE2EAttribute(container, E2EAttribute.text)).toHaveAttribute(
      'style',
      `color: rgb(${rgb.r}, ${rgb.g}, ${rgb.b}); text-align: inherit;`,
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

  it('should pass className', () => {
    //before
    const { container } = render(
      <Typography className={className}>children</Typography>,
    );

    // result
    expect(container.querySelector(`.${className}`)).not.toBeNull();
  });

  it('should pass color', () => {
    //mock
    const rgb1 = hexToRgb(COLORS.blue1Light);
    const rgb2 = hexToRgb(COLORS.neutral5Light);

    // before
    const { container: container1 } = render(
      <Typography applyInlineColors color={COLORS.blue1Light}>
        children
      </Typography>,
    );

    const { container: container2 } = render(
      <Typography applyInlineColors color={TYPOGRAPHY_COLORS_MODE.neutral5}>
        children
      </Typography>,
    );

    // result
    expect(getByE2EAttribute(container1, E2EAttribute.text)).toHaveAttribute(
      'style',
      `color: rgb(${rgb1.r}, ${rgb1.g}, ${rgb1.b}); text-align: inherit;`,
    );

    expect(getByE2EAttribute(container2, E2EAttribute.text)).toHaveAttribute(
      'style',
      `color: rgb(${rgb2.r}, ${rgb2.g}, ${rgb2.b}); text-align: inherit;`,
    );
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

  it('should pass fontType', () => {
    // mock
    const fontTypes = enumToArray<TypographyFontType>(TypographyFontType);

    //before
    const { container } = render(
      <>
        {fontTypes.map((fontType) => (
          <Typography e2eValue={fontType} fontType={fontType} key={fontType}>
            children
          </Typography>
        ))}
      </>,
    );

    // result
    fontTypes.forEach((fontType) => {
      expect(
        getByE2EAttribute(container, E2EAttribute.text, fontType),
      ).toHaveClass(classNames[classNameTypography].modificators[fontType]);

      expect(container.getElementsByTagName(fontType)[0]).not.toBeNull();
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

  it('should pass style', () => {
    // before
    const { container } = render(
      <Typography style={{ width: '100%' }}>children</Typography>,
    );

    // result
    expect(getByE2EAttribute(container, E2EAttribute.text)).toHaveAttribute(
      'style',
      `width: 100%; text-align: inherit;`,
    );
  });

  it('should pass withoutMargin', () => {
    //before
    const { container } = render(
      <Typography withoutMargin={false}>children</Typography>,
    );

    // result
    expect(getByE2EAttribute(container, E2EAttribute.text)).not.toHaveClass(
      classNames[classNameTypography].modificators.withoutMargin,
    );
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
