import { render } from '@testing-library/react';

// components
import H6 from './H6';

describe('H6 snapshots', () => {
  it('should render H6', () => {
    //before
    const { asFragment } = render(<H6>H6</H6>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
