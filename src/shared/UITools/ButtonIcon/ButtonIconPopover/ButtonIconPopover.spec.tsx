import { RefObject } from 'react';
import { noop } from 'lodash';

// components
import ButtonIconPopover from './ButtonIconPopover';

// utils
import { customRender } from 'test';

const ref = { current: {} } as RefObject<HTMLDivElement>;

describe('TextFieldPopover snapshots', () => {
  it('should render ButtonIconPopover', () => {
    // before
    const { asFragment } = customRender(
      <ButtonIconPopover ref={ref} selected={false} setSelected={noop}>
        children
      </ButtonIconPopover>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with opened popover', () => {
    // before
    const { asFragment } = customRender(
      <ButtonIconPopover ref={ref} selected setSelected={noop}>
        children
      </ButtonIconPopover>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
