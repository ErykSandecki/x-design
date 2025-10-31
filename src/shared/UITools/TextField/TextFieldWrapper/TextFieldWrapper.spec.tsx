import { fireEvent } from '@testing-library/react';
import { RefObject } from 'react';

// components
import TextFieldWrapper from './TextFieldWrapper';
import { PopoverCompound } from '../../Popover/Popover';

// types
import { E2EAttribute } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

const id = 'id';
const ref = { current: null } as unknown as RefObject<HTMLInputElement>;

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
      <TextFieldWrapper chipChildren={<>chip</>} e2eValue="text-field" idContainer={id} />,
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
        chipChildren={<>chip</>}
        inputRef={ref}
        e2eValue="text-field"
        popoverChildren={<PopoverCompound.PopoverSeparator />}
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
