import { render } from '@testing-library/react';

// components
import TextFieldChip from './TextFieldChip';

describe('TextFieldChip snapshots', () => {
  it('should render TextFieldChip', () => {
    // before
    const { asFragment } = render(<TextFieldChip attachedValue>children</TextFieldChip>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render', () => {
    // before
    const { asFragment } = render(<TextFieldChip attachedValue={false}>children</TextFieldChip>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
