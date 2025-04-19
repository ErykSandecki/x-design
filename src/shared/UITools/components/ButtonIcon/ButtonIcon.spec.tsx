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

  it('should render when is selected', () => {
    // before
    const { asFragment } = render(<ButtonIcon name="Close" selected />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
