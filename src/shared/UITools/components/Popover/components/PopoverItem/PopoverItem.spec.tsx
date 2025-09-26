import { fireEvent, render } from '@testing-library/react';

// components
import PopoverItem from './PopoverItem';

// types
import { E2EAttribute } from 'types';

// utils
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

describe('PopoverItem snapshots', () => {
  it('should render PopoverItem', () => {
    // before
    const { asFragment } = render(
      <PopoverItem
        icon="AlignHorizontalCenter"
        index={0}
        onClick={mockCallBack}
        selected={false}
        setSelected={mockCallBack}
        text="text"
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render selected', () => {
    // before
    const { asFragment } = render(
      <PopoverItem
        icon="AlignHorizontalCenter"
        index={0}
        onClick={mockCallBack}
        selected
        setSelected={mockCallBack}
        text="text"
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('PopoverItem behaviors', () => {
  it('should click item', () => {
    // before
    const { container } = render(
      <PopoverItem
        icon="AlignHorizontalCenter"
        index={0}
        onClick={mockCallBack}
        selected={false}
        setSelected={mockCallBack}
        text="text"
      />,
    );

    // find
    const item = getByE2EAttribute(container, E2EAttribute.popoverItem, 0);

    // action
    fireEvent.click(item);

    // result
    expect(mockCallBack.mock.calls[1][0]).toBe(false);
  });
});
