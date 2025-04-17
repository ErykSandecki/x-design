import { render } from '@testing-library/react';

// components
import ButtonIcon from './ButtonIcon';

describe('ButtonIcon snapshots', () => {
  it('should render ButtonIcon', () => {
    // before
    const { asFragment } = render(<ButtonIcon name="Close" />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
