import { noop } from 'lodash';
import { RefObject } from 'react';

// components
import GridAreaPopover from './GridAreaPopover';

// utils
import { customRender } from 'test';

const ref = { current: { getBoundingClientRect: () => ({ left: 0, top: 0 }) } } as RefObject<HTMLDivElement>;

describe('TextFieldPopover snapshots', () => {
  it('should render ButtonIconPopover', () => {
    // before
    const { asFragment } = customRender(<GridAreaPopover ref={ref} selected={false} setSelected={noop} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with opened popover', () => {
    // before
    const { asFragment } = customRender(<GridAreaPopover ref={ref} selected setSelected={noop} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
