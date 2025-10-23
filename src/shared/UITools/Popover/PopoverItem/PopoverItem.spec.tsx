import { fireEvent } from '@testing-library/react';

// components
import PopoverItem from './PopoverItem';
import PopoverRoot from '../PopoverRoot/PopoverRoot';

// types
import { E2EAttribute } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

describe('PopoverItem snapshots', () => {
  it('should render PopoverItem', () => {
    // before
    const { asFragment } = customRender(
      <PopoverRoot setSelected={mockCallBack}>
        <PopoverItem icon="AlignHorizontalCenter" index={0} onClick={mockCallBack} selected={false} text="text" />
      </PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render selected', () => {
    // before
    const { asFragment } = customRender(
      <PopoverRoot setSelected={mockCallBack}>
        <PopoverItem icon="AlignHorizontalCenter" index={0} onClick={mockCallBack} selected text="text" />
      </PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render not visible', () => {
    // before
    const { asFragment } = customRender(
      <PopoverRoot setSelected={mockCallBack}>
        <PopoverItem icon="AlignHorizontalCenter" index={0} onClick={mockCallBack} text="text" visible={false} />
      </PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('PopoverItem behaviors', () => {
  it('should click item', () => {
    // before
    const { container } = customRender(
      <PopoverRoot setSelected={mockCallBack}>
        <PopoverItem icon="AlignHorizontalCenter" index={0} onClick={mockCallBack} selected={false} text="text" />
      </PopoverRoot>,
    );

    // find
    const item = getByE2EAttribute(container, E2EAttribute.popoverItem, 0);

    // action
    fireEvent.click(item);

    // result
    expect(mockCallBack.mock.calls[1][0]).toBe(false);
  });
});
