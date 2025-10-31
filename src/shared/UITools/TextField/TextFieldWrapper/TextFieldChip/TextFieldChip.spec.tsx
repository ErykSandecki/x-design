import { render } from '@testing-library/react';

// components
import TextFieldChip from './TextFieldChip';

describe('TextFieldChip snapshots', () => {
  it('should render TextFieldChip', () => {
    // before
    const { asFragment } = render(<TextFieldChip>children</TextFieldChip>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
