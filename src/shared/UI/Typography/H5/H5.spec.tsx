import { render } from '@testing-library/react';

// components
import H5 from './H5';

describe('H5 snapshots', () => {
  it('should render H5', () => {
    //before
    const { asFragment } = render(<H5>H5</H5>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
