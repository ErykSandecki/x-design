import { render } from '@testing-library/react';

// components
import RouteTransitionLoader from './RouteTransitionLoader';

describe('RouteTransitionLoader snapshots', () => {
  it('should render RouteTransitionLoader', () => {
    // before
    const { asFragment } = render(<RouteTransitionLoader />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
