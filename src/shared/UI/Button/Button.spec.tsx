import { fireEvent, waitFor } from '@testing-library/react';

// components
import Button from './Button';

// others
import { RIPPLE_EFFECT_MODIFICATOR } from '../../../hooks/useRippleEffect/constants';

// types
import { ButtonColor, ButtonVariant } from './enums';
import { E2EAttribute } from 'types';
import { InputSize } from '../enums';

// utils
import { enumToArray } from '../../../utils/transform/enumToArray';
import { customRender, getByE2EAttribute } from 'test';
import { getDataTestAttribute } from '../../E2EDataAttributes/utils';

const buttonModificators: Record<string, string> = {
  contained: 'Button--contained',
  error: 'Button--error',
  forcedHover: 'Button--forced-hover',
  fullwidth: 'Button--fullwidth',
  large: 'Button--large',
  medium: 'Button--medium',
  outlined: 'Button--outlined',
  primary: 'Button--primary',
  secondary: 'Button--secondary',
  small: 'Button--small',
  success: 'Button--success',
  text: 'Button--text',
  warning: 'Button--warning',
};

const className = 'className';
const content = 'Click';
const mockCallBack = jest.fn();

describe('Button behaviors', () => {
  it('should render rippleEffect after click', async () => {
    // before
    const { container } = customRender(<Button>{content}</Button>);

    // find
    const button = getByE2EAttribute(container, E2EAttribute.button);

    // action
    fireEvent.click(button);

    // result
    await waitFor(() => {
      expect(button.lastChild).toHaveClass(`${'Button'}--${RIPPLE_EFFECT_MODIFICATOR}`);
    });
  });
});

describe('Button props', () => {
  it('should pass children', () => {
    // before
    const { container } = customRender(<Button>{content}</Button>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).toHaveTextContent(content);
  });

  it('should pass className', () => {
    // before
    const { container } = customRender(<Button classes={{ className }}>{content}</Button>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).not.toBeNull();
  });

  it('should pass color', () => {
    // mock
    const colors = enumToArray<ButtonColor>(ButtonColor);

    // before
    const { container } = customRender(
      <>
        {colors.map((color) => (
          <Button color={color} e2eValue={color} key={color}>
            {content}
          </Button>
        ))}
      </>,
    );

    // result
    colors.forEach((color) =>
      expect(getByE2EAttribute(container, E2EAttribute.button, color)).toHaveClass(buttonModificators[color]),
    );
  });

  it('should pass disableRippleEffect', async () => {
    // before
    const { container } = customRender(<Button disabledRippleEffect>{content}</Button>);

    // find
    const button = getByE2EAttribute(container, E2EAttribute.button);

    // action
    fireEvent.click(button);

    // result
    await waitFor(() => {
      expect(button.lastChild).toHaveTextContent(content);
    });
  });

  it('should pass e2eAttribute', () => {
    // before
    const { container } = customRender(<Button e2eAttribute={E2EAttribute.button}>{content}</Button>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).toHaveAttribute(
      getDataTestAttribute(E2EAttribute.button),
    );
  });

  it('should pass e2eValue', () => {
    // mock
    const e2eValue = 'e2eValue';

    // before
    const { container } = customRender(<Button e2eValue={e2eValue}>{content}</Button>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).toHaveAttribute(
      getDataTestAttribute(E2EAttribute.button),
      e2eValue,
    );
  });

  it('should pass endIcon', () => {
    // before
    const { container } = customRender(<Button endIcon="Comment">{content}</Button>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button).lastChild).toHaveClass('Button__icon');
  });

  it('should pass forcedHover', () => {
    // before
    const { container } = customRender(<Button forcedHover>{content}</Button>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).toHaveClass('Button--forced-hover');
  });

  it('should pass fullWidth', () => {
    // before
    const { container } = customRender(<Button fullWidth>{content}</Button>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).toHaveClass('Button--fullwidth');
  });

  it('should pass onClick', () => {
    // before
    const { container } = customRender(<Button onClick={mockCallBack}>{content}</Button>);

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.button));

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should pass size', () => {
    // mock
    const sizes = enumToArray<InputSize>(InputSize);

    // before
    const { container } = customRender(
      <>
        {sizes.map((size) => (
          <Button e2eValue={size} key={size} size={size}>
            {content}
          </Button>
        ))}
      </>,
    );

    // result
    sizes.forEach((size) =>
      expect(getByE2EAttribute(container, E2EAttribute.button, size)).toHaveClass(buttonModificators[size]),
    );
  });

  it('should pass startIcon', () => {
    // before
    const { container } = customRender(<Button startIcon={'AlignHorizontalCenter'}>{content}</Button>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button).firstChild).toHaveClass('Button__icon');
  });

  it('should pass type', () => {
    // before
    const { container } = customRender(<Button type="submit">{content}</Button>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).toHaveAttribute('type', 'submit');
  });

  it('should pass variant', () => {
    // mock
    const variants = enumToArray<ButtonVariant>(ButtonVariant);

    // before
    const { container } = customRender(
      <>
        {variants.map((variant) => (
          <Button e2eValue={variant} key={variant} variant={variant}>
            {content}
          </Button>
        ))}
      </>,
    );

    // result
    variants.forEach((variant) =>
      expect(getByE2EAttribute(container, E2EAttribute.button, variant)).toHaveClass(buttonModificators[variant]),
    );
  });
});

describe('Button snapshots', () => {
  it('should render Button', () => {
    // before
    const { asFragment } = customRender(<Button>{content}</Button>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
