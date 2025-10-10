import { render } from '@testing-library/react';

// components
import Color from './Color';

describe('Color snapshots', () => {
  it('should render Color', () => {
    // before
    const { asFragment } = render(<Color alpha="" color="" />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
