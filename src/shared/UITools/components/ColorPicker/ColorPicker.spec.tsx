import { fireEvent, render } from '@testing-library/react';

// components
import ColorPicker from './ColorPicker';

// types
import { E2EAttribute, KeyboardKeys } from 'types';

// utils
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

describe('ColorPicker snapshots', () => {
  it('should render ColorPicker', () => {
    // before
    const { asFragment } = render(
      <ColorPicker
        activeSampler={false}
        alpha="100"
        color="#ffffff"
        onChangeAlpha={mockCallBack}
        onChangeColor={mockCallBack}
        onClickColorSampler={mockCallBack}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColorPicker behaviors', () => {
  it('should change and submit alpha', () => {
    // before
    const { container } = render(
      <ColorPicker
        activeSampler={false}
        alpha="100"
        color="#ffffff"
        onChangeAlpha={mockCallBack}
        onChangeColor={mockCallBack}
        onClickColorSampler={mockCallBack}
      />,
    );

    // find
    const input = getByE2EAttribute(
      container,
      E2EAttribute.textFieldInput,
      'alpha',
    );

    // action
    fireEvent.change(input, { target: { value: '50' } });
    fireEvent.keyDown(input, { key: KeyboardKeys.enter });
    fireEvent.blur(input);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('50');
  });

  it('should change and submit color', () => {
    // before
    const { container } = render(
      <ColorPicker
        activeSampler={false}
        alpha="100"
        color="#ffffff"
        onChangeAlpha={mockCallBack}
        onChangeColor={mockCallBack}
        onClickColorSampler={mockCallBack}
      />,
    );

    // find
    const input = getByE2EAttribute(
      container,
      E2EAttribute.textFieldInput,
      'color',
    );

    // action
    fireEvent.change(input, { target: { value: '000000' } });
    fireEvent.keyDown(input, { key: KeyboardKeys.enter });
    fireEvent.blur(input);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[0][1]).toBe('#000000');
  });
});
