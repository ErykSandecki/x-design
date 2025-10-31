import { fireEvent } from '@testing-library/react';
import { RefObject } from 'react';

// components
import TextFieldWrapper from './TextFieldWrapper';
import { PopoverCompound } from '../../Popover/Popover';

// types
import { E2EAttribute, KeyboardKeys } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

const id = 'id';
const ref = { current: null } as unknown as RefObject<HTMLInputElement>;
const mockCallBack = jest.fn();

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  handleSubmitInput: (): any => mockCallBack,
}));

describe('TextFieldWrapper snapshots', () => {
  it('should render TextFieldWrapper', () => {
    // before
    const { asFragment } = customRender(<TextFieldWrapper e2eValue="text-field" />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with popover', () => {
    // before
    const { asFragment } = customRender(
      <TextFieldWrapper
        e2eValue="text-field"
        idContainer={id}
        popoverChildren={<PopoverCompound.PopoverSeparator />}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with chip', () => {
    // before
    const { asFragment } = customRender(
      <TextFieldWrapper attachedValue e2eValue="text-field" idContainer={id} value="value" />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should click on input', () => {
    // before
    const { asFragment, container } = customRender(<TextFieldWrapper inputRef={ref} e2eValue="text-field" />);

    // find
    const textFieldInput = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'text-field');

    // action
    fireEvent.click(textFieldInput);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should click and open popover', () => {
    // before
    const { asFragment, container } = customRender(
      <TextFieldWrapper
        attachedValue
        inputRef={ref}
        e2eValue="text-field"
        popoverChildren={<PopoverCompound.PopoverSeparator />}
        value="value"
      />,
    );

    // find
    const textFieldInput = getByE2EAttribute(container, E2EAttribute.textFieldWrapper, 'text-field');

    // action
    fireEvent.click(textFieldInput);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('TextFieldWrapper behaviors', () => {
  it('should submit value when enter key', () => {
    // before
    const { container } = customRender(
      <TextFieldWrapper
        attachedValue
        inputRef={ref}
        e2eValue="text-field"
        popoverChildren={<PopoverCompound.PopoverSeparator />}
        value="value"
      />,
    );

    // find
    const textFieldInput = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'text-field');

    // action
    fireEvent.keyDown(textFieldInput, { key: KeyboardKeys.enter });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
