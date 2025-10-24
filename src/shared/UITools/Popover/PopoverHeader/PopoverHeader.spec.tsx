import { fireEvent } from '@testing-library/react';

// components
import PopoverRoot from '../PopoverRoot/PopoverRoot';
import PopoverHeader from './PopoverHeader';

// types
import { E2EAttribute } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

describe('PopoverHeader snapshots', () => {
  it('should render PopoverHeader', () => {
    // before
    const { asFragment } = customRender(
      <PopoverRoot setSelected={mockCallBack}>
        <PopoverHeader title="title" />
      </PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('PopoverHeader behaviors', () => {
  it('should click item', () => {
    // before
    const { container } = customRender(
      <PopoverRoot setSelected={mockCallBack}>
        <PopoverHeader title="title" />
      </PopoverRoot>,
    );

    // find
    const header = getByE2EAttribute(container, E2EAttribute.popoverHeader, 0);
    const icon = getByE2EAttribute(header, E2EAttribute.icon, 'close');

    // action
    fireEvent.click(icon);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(false);
  });
});
