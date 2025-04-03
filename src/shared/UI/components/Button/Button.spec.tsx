import { fireEvent, render, waitFor } from '@testing-library/react';

// components
import Button from './Button';

// others
import { className as classNameButton, classNames } from './classNames';
import { RIPPLE_EFFECT_MODIFICATOR } from '../../../../hooks/useRippleEffect/constants';

// types
import { ButtonColor, ButtonVariant } from './enums';
import { E2EAttribute } from 'types';
import { InputSize } from '../../enums';

// utils
import { enumToArray } from '../../../../utils/transform/enumToArray';
import { getByE2EAttribute } from 'test';
import { getDataTestAttribute } from '../../../E2EDataAttributes/utils';

const className = 'className';
const content = 'Click';
const mockCallBack = jest.fn();

describe('Button behaviors', () => {
  it('should render rippleEffect after click', async () => {
    // before
    const { container } = render(<Button>{content}</Button>);

    // find
    const button = getByE2EAttribute(container, E2EAttribute.button);

    // action
    fireEvent.click(button);

    // result
    await waitFor(() => {
      expect(button.lastChild).toHaveClass(
        `${classNames[classNameButton].name}--${RIPPLE_EFFECT_MODIFICATOR}`,
      );
    });
  });
});

describe('Button props', () => {
  it('should pass children', () => {
    // before
    const { container } = render(<Button>{content}</Button>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).toHaveTextContent(
      content,
    );
  });

  it('should pass className', () => {
    // before
    const { container } = render(
      <Button className={className}>{content}</Button>,
    );

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).not.toBeNull();
  });

  it('should pass color', () => {
    // mock
    const colors = enumToArray<ButtonColor>(ButtonColor);

    // before
    const { container } = render(
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
      expect(
        getByE2EAttribute(container, E2EAttribute.button, color),
      ).toHaveClass(classNames[classNameButton].modificators[color]),
    );
  });

  it('should pass disableRippleEffect', async () => {
    // before
    const { container } = render(
      <Button disabledRippleEffect>{content}</Button>,
    );

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
    const { container } = render(
      <Button e2eAttribute={E2EAttribute.button}>{content}</Button>,
    );

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).toHaveAttribute(
      getDataTestAttribute(E2EAttribute.button),
    );
  });

  it('should pass e2eValue', () => {
    // mock
    const e2eValue = 'e2eValue';

    // before
    const { container } = render(
      <Button e2eValue={e2eValue}>{content}</Button>,
    );

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).toHaveAttribute(
      getDataTestAttribute(E2EAttribute.button),
      e2eValue,
    );
  });

  it('should pass endIcon', () => {
    // before
    const { container } = render(
      <Button endIcon={{ name: 'Comment' }}>{content}</Button>,
    );

    // result
    expect(
      getByE2EAttribute(container, E2EAttribute.button).lastChild,
    ).toHaveClass(classNames.icon.name);
  });

  it('should pass forcedHover', () => {
    // before
    const { container } = render(<Button forcedHover>{content}</Button>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).toHaveClass(
      classNames[classNameButton].modificators.forcedHover,
    );
  });

  it('should pass fullWidth', () => {
    // before
    const { container } = render(<Button fullWidth>{content}</Button>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).toHaveClass(
      classNames[classNameButton].modificators.fullwidth,
    );
  });

  it('should pass onClick', () => {
    // before
    const { container } = render(
      <Button onClick={mockCallBack}>{content}</Button>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.button));

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should pass size', () => {
    // mock
    const sizes = enumToArray<InputSize>(InputSize);

    // before
    const { container } = render(
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
      expect(
        getByE2EAttribute(container, E2EAttribute.button, size),
      ).toHaveClass(classNames[classNameButton].modificators[size]),
    );
  });

  it('should pass startIcon', () => {
    // before
    const { container } = render(
      <Button startIcon={{ name: 'Comment' }}>{content}</Button>,
    );

    // result
    expect(
      getByE2EAttribute(container, E2EAttribute.button).firstChild,
    ).toHaveClass(classNames.icon.name);
  });

  it('should pass type', () => {
    // before
    const { container } = render(<Button type="submit">{content}</Button>);

    // result
    expect(getByE2EAttribute(container, E2EAttribute.button)).toHaveAttribute(
      'type',
      'submit',
    );
  });

  it('should pass variant', () => {
    // mock
    const variants = enumToArray<ButtonVariant>(ButtonVariant);

    // before
    const { container } = render(
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
      expect(
        getByE2EAttribute(container, E2EAttribute.button, variant),
      ).toHaveClass(classNames[classNameButton].modificators[variant]),
    );
  });
});

describe('Button snapshots', () => {
  it('should render Button', () => {
    // before
    const { asFragment } = render(<Button>{content}</Button>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
