import { noop } from 'lodash';
import { RefObject } from 'react';

// components
import GridAreaPopover from './GridAreaPopover';

// utils
import { customRender } from 'test';

const ref = { current: { getBoundingClientRect: () => ({ left: 0, top: 0 }) } } as RefObject<HTMLDivElement>;

describe('GridAreaPopover snapshots', () => {
  it('should render GridAreaPopover', () => {
    // before
    const { asFragment } = customRender(
      <GridAreaPopover columns="1" ref={ref} rows="1" selected={false} setSelected={noop} />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with opened popover', () => {
    // before
    const { asFragment } = customRender(<GridAreaPopover columns="1" ref={ref} rows="1" selected setSelected={noop} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
