import { fireEvent, render } from '@testing-library/react';

// components
import TextFieldChip from './TextFieldChip';

// types
import { E2EAttribute } from 'types';

// utils
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

describe('TextFieldChip snapshots', () => {
  it('should render TextFieldChip', () => {
    // before
    const { asFragment } = render(<TextFieldChip onClick={mockCallBack}>children</TextFieldChip>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('TextFieldChip behaviors', () => {
  it('should render TextFieldChip', () => {
    // before
    const { container } = render(<TextFieldChip onClick={mockCallBack}>children</TextFieldChip>);

    // find
    const chip = getByE2EAttribute(container, E2EAttribute.chip);

    // action
    fireEvent.click(chip);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
