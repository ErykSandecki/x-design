import { fireEvent, render } from '@testing-library/react';
import { RefObject } from 'react';

// components
import TextField from './TextField';
import { PopoverCompound } from '../Popover/Popover';

// types
import { E2EAttribute } from 'types';

// utils
import { getByE2EAttribute } from 'test';

const id = 'id';
const ref = { current: null } as unknown as RefObject<HTMLInputElement>;

describe('TextField snapshots', () => {
  it('should render TextField', () => {
    // before
    const { asFragment } = render(<TextField />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with popover', () => {
    // before
    const { asFragment } = render(
      <TextField idContainer={id} popoverChildren={<PopoverCompound.PopoverSeparator />} />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with chip', () => {
    // before
    const { asFragment } = render(<TextField chipChildren={<>chip</>} idContainer={id} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('TextField behaviors', () => {
  it('should click on chip', () => {
    // before
    const { container } = render(<TextField chipChildren="chip" ref={ref} />);

    // find
    const chip = getByE2EAttribute(container, E2EAttribute.chip);

    // action
    fireEvent.click(chip);

    // result
    expect(document.activeElement === ref.current).toBe(true);
  });
});
