import { render } from '@testing-library/react';

// components
import TextField from './TextField';
import { PopoverCompound } from '../Popover/Popover';

const id = 'id';

describe('TextField snapshots', () => {
  it('should render TextField', () => {
    // before
    const { asFragment } = render(<TextField />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render wiht popover', () => {
    // before
    const { asFragment } = render(
      <TextField idContainer={id} popoverChildren={<PopoverCompound.PopoverSeparator />} />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
