import { noop } from 'lodash';
import { RefObject } from 'react';
import { render } from '@testing-library/react';

// components
import Popover, { PopoverCompound } from './Popover';

// utils
import { createHtmlElement } from 'utils';

const refItem = { current: createHtmlElement('div') } as RefObject<HTMLElement>;

describe('Popover snapshots', () => {
  it('should render Popover', () => {
    // before
    const { asFragment } = render(
      <Popover e2eValue="popover" refItem={refItem} selected={false}>
        <PopoverCompound.PopoverRoot setSelected={noop}>
          <PopoverCompound.PopoverItem
            icon="AlignHorizontalCenter"
            index={0}
            selected={false}
            text="text"
          />
          <PopoverCompound.PopoverItem
            icon="AlignHorizontalCenter"
            index={1}
            selected
            text="text"
          />
        </PopoverCompound.PopoverRoot>
        <PopoverCompound.PopoverSeparator />
      </Popover>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render selected', () => {
    // before
    const { asFragment } = render(
      <Popover e2eValue="popover" refItem={refItem} selected>
        <PopoverCompound.PopoverRoot setSelected={noop}>
          <PopoverCompound.PopoverItem
            icon="AlignHorizontalCenter"
            index={0}
            selected={false}
            text="text"
          />
          <PopoverCompound.PopoverItem
            icon="AlignHorizontalCenter"
            index={1}
            selected
            text="text"
          />
          <PopoverCompound.PopoverSeparator />
        </PopoverCompound.PopoverRoot>
      </Popover>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
